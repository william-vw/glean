package wvw.glean.workflow.print;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.jen3.rdf.model.Resource;
import org.apache.jen3.vocabulary.RDFS;

import wvw.glean.workflow.WorkflowModel;

public class WorkflowD3TreePrinter extends WorkflowJsonPrinter {

	private Map<String, Node> nodeMap = new HashMap<>();

	public WorkflowD3TreePrinter() {
	}

	public WorkflowD3TreePrinter(PrintJsonTaskHook taskHook) {
		super(taskHook);
	}

	public void print(WorkflowModel m) {
		this.kb = m.getKb();

		Resource wf = getWorkflow();
		if (wf == null)
			return;

		LOG.info("printing: " + wf.getLocalName());

		prepare(wf);
//			System.out.println(nodeMap);

		Node wfNode = nodeMap.get(getId(wf));
		print(new NodeLink(wf, wfNode));
	}

	protected void prepare(Resource wf) {
		nodeMap.clear();

		prepare(wf, null, 0);
	}

	protected void prepare(Resource entity, Node parent, int depth) {
		Resource task = getTask(entity);
		String id = getId(task);

		Node node = nodeMap.get(id);
		if (node == null) {
			node = new Node(task);
			nodeMap.put(id, node);
		}

		if (parent != null)
			node.addParent(entity, parent, depth);

		Iterator<Resource> it = getFollowing(task).iterator();
		while (it.hasNext()) {
			Resource next = it.next();
			prepare(next, node, depth + 1);
		}
	}

	protected boolean print(NodeLink link) {
		// use branch's target for most operations

		Node curParent = link.getParent();
		Node curNode = link.getChild();
		int curDepth = link.getDepth();

		Resource entity = link.getEntity();
		Resource task = curNode.getTask();
		String curId = getId(task);

		// parent task is *not* the lowest-down parent
		// could skip this child but layout gets wonky
		// try to bias layout by adding 'hidden' children

//		System.out.println("node: " + curNode + " - " + curDepth + " <> " + curNode.getMaxDepth());

		if (curNode.getParents().size() > 1) {

			// only print at lowest-down level
			if (curNode.getMaxDepth() > curDepth) {

				if (curNode.getMaxDepth() == (curDepth + 1))
					str.append("{").append(printKeyValue("hidden", true)).append("}");

				return false;
			}

			// we're at lowest level but node was already shown
			if (curNode.isShown())
				return false;

			curNode.setShown(true);
		}

		str.append("{");

		str.append(printKeyString("id", curId, true));

		String label = null;
		if (task.hasProperty(RDFS.label))
			label = task.getProperty(RDFS.label).getObject().asLiteral().getString();
		else
			label = task.getLocalName();

		str.append(printKeyString("name", label, true));

		if (curParent != null) {
			Resource parentTask = curParent.getTask();

			boolean composed = kb.contains(parentTask, kb.resource("gl:subTask"), task);
			str.append(printKeyValue("composed", composed, true));
		}

		// we're at lowest-down position for this node
		// and the node has multiple parents

		// so, list the other parents as a property

		if (curNode.getParents().size() > 1) {
			str.append(printKeyArray("otherParents", curNode.getParents().stream()
					.filter(p -> !p.getParent().equals(curParent))
					.map(p -> "{" + printKeyString("id", getId(p.getParent().getTask()), true)
							+ printKeyValue("condition", getCondition(p.getEntity())) + "}")
					.collect(Collectors.toList()), false, true));
		}

		String type = getType(task);
		str.append(printKeyString("node_type", type, true));

		String wfState = getWorkflowState(entity);
		str.append(printKeyString("workflow_state", wfState, true));

		String dcState = getDecisionalState(entity);
		str.append(printKeyString("decisional_state", dcState));

		String cond = getCondition(entity);
		if (cond != null) {
			str.append(",");
			str.append(printKeyValue("condition", cond));
		}

		String descr = null;

		if (task.hasProperty(RDFS.comment)) {
			String comment = task.getProperty(RDFS.comment).getObject().asLiteral().getString();
			descr = comment;
		}

		if (descr != null) {
			str.append(",");
			str.append(printKeyString("description", txtToJson(descr)));
		}

		runTaskHook(task);

		List<NodeLink> children = curNode.getChildren();
		boolean hasChildren = !children.isEmpty();
		if (hasChildren) {
			str.append(",");
			str.append("\"children\": [");
		}

		// currently, move all children with multiple parents to the right
		// if child is not at lowest-down position, tends to 'pull' parent to the right
		// if child is at lowest-down position, will be shifted to the right

		sort(children);
		// System.out.println("children: " + children);

		boolean prior = false;
		for (int i = 0; i < children.size(); i++) {
			NodeLink childLink = children.get(i);

			int pos = str.length();
			print(childLink);

			if (str.length() > pos) {
				if (prior)
					str.insert(pos, ",");

				prior = true;
			}
		}

		if (hasChildren)
			str.append("]");

		str.append("}");

		return true;
	}

	private String getCondition(Resource entity) {
		String label = null;
		String descr = null;

		if (entity.hasProperty(kb.resource("gl:precondition"))) {
			Resource cond = entity.getProperty(kb.resource("gl:precondition")).getObject();

			if (cond.equals(kb.resource("gl:Other")))
				label = "other";

			else {
				if (cond.hasProperty(RDFS.label))
					label = cond.getProperty(RDFS.label).getObject().asLiteral().getString();
			}

			if (cond.hasProperty(RDFS.comment))
				descr = cond.getProperty(RDFS.comment).getObject().asLiteral().getString();
		}

		if (label == null)
			return null;

		StringBuffer str = new StringBuffer();
		str.append("{");
		str.append(printKeyString("label", label));
		if (descr != null) {
			str.append(",");
			str.append(printKeyString("description", txtToJson(descr)));
		}
		str.append("}");

		return str.toString();
	}

	private void sort(List<NodeLink> children) {
		children.sort((c1, c2) -> Integer.valueOf(c1.getChild().getSortValue())
				.compareTo(c2.getChild().getSortValue()));
	}

	protected class Node {

		private Resource task;
		private List<NodeLink> parents = new ArrayList<>();
		private List<NodeLink> children = new ArrayList<>();

		private boolean shown = false;

		public Node(Resource task) {
			this.task = task;
		}

		public void addParent(Resource entity, Node parent, int depth) {
			if (!parents.stream().anyMatch(l -> l.getParent().equals(parent))) {
				NodeLink l = new NodeLink(entity, this, parent, depth);
				parents.add(l);

				parent.addChild(l);
			}
		}

		private void addChild(NodeLink l) {
			children.add(l);
		}

		public Resource getTask() {
			return task;
		}

		public List<NodeLink> getParents() {
			return parents;
		}

		public List<NodeLink> getChildren() {
			return children;
		}

		public boolean isShown() {
			return shown;
		}

		public void setShown(boolean shown) {
			this.shown = shown;
		}

		public int getMaxDepth() {
			if (parents.isEmpty())
				return 0;
			else
				return parents.stream().mapToInt(l -> l.getDepth()).max().getAsInt();
		}

		public int getSortValue() {
			int ret = 0;

			if (parents.size() > 1)
				ret = 2;

			else if (findDescendant(this, (l) -> l.getChild().getParents().size() > 1))
				ret = 1;

//			System.out.println("sort: " + ret + " - " + this);
			return ret;
		}

		protected boolean findDescendant(Node n, Function<NodeLink, Boolean> retFn) {
			for (NodeLink link : n.getChildren()) {
				if (retFn.apply(link))
					return true;

				if (findDescendant(link.getChild(), retFn))
					return true;
			}

			return false;
		}

		@Override
		public boolean equals(Object o) {
			if (!(o instanceof Node))
				return false;

			Node n = (Node) o;
			return getId(task).equals(getId(n.getTask()));
		}

		@Override
		public int hashCode() {
			return getId(task).hashCode();
		}

		@Override
		public String toString() {
			return "<" + getId(task) + " @" + getMaxDepth() + " from (#" + parents.size() + ")>";
		}
	}

	protected class NodeLink {

		private Resource entity;
		private Node child;
		private Node parent;
		private int depth = 0;

		public NodeLink(Resource wf, Node node) {
			this.entity = wf;
			this.child = node;
		}

		public NodeLink(Resource entity, Node child, Node parent, int depth) {
			this.entity = entity;
			this.parent = parent;
			this.child = child;
			this.depth = depth;
		}

		public Resource getEntity() {
			return entity;
		}

		public Node getParent() {
			return parent;
		}

		public Node getChild() {
			return child;
		}

		public int getDepth() {
			return depth;
		}

		public String toString() {
			return child.toString();
		}
	}
}
