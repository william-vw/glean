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

		Node wfNode = prepare(wf);
		print(new NodeLink(wf, wfNode));
	}

	protected Node prepare(Resource wf) {
		nodeMap.clear();

		return prepare(wf, null, 0, false);
	}

	protected Node prepare(Resource entity, Node parent, int depth, boolean composed) {
		Resource task = getTask(entity);
		String id = getId(task);

		Node node = nodeMap.get(id);
		if (node == null) {
			node = new Node(task);
			nodeMap.put(id, node);
		}

		if (entity.hasProperty(kb.resource("gl:order"))) {
			int order = entity.getPropertyResourceValue(kb.resource("gl:order")).asLiteral()
					.getInt();
			node.setOrder(order);
		}

		if (parent != null)
			node.addParent(entity, parent, depth, composed);

		Iterator<Resource> it = getComposed(task).iterator();
		while (it.hasNext()) {
			Resource sub = it.next();
			prepare(sub, node, depth + 1, true);
		}

		it = getNext(task).iterator();
		while (it.hasNext()) {
			Resource next = it.next();
			prepare(next, node, depth + 1, false);
		}

		return node;
	}

	protected boolean print(NodeLink link) {
		// use branch's target for most operations

		Node curParent = link.getParent();
		Node curNode = link.getChild();
		int curDepth = link.getDepth();

		Resource entity = link.getEntity();
		Resource task = curNode.getTask();
		String curId = getId(task);

//		LOG.info("node: " + curNode + " - " + curDepth + " <> " + curNode.getMaxDepth());

		// node has more than 1 parent but tree hierarchies are not meant for this
		// so do some hacking here; add "hidden" children to fix layout

		// - case 1:
		// parent at depth-1, parent at depth-2 (possibly higher parents as well)
		// 1) child will only be printed for deepest-down parent
		// 2) add hidden child at the end for parent at depth-2 ("clears way" for its
		// link; this will pull workflow to the left)
		// 3) when printing child, and it has no siblings, first add hidden child to
		// pull to right again
		// higher-up parents will have curved edge & hope for the best

		// - case 2:
		// multiple parents at depth - 1
		// 1) child will be printed for first (i.e., left-hand) parent;
		// this will pull workflow to the left
		// 2) when printing child, and it has no siblings, first add hidden child to
		// pull to right again

		if (curNode.getParents().size() > 1) {

			// this parent is not the lowest-down parent
			if (curDepth < curNode.getMaxDepth()) {

//				if (curParent.getChildren().size() > 1)

				// second lowest-down parent:
				// add hidden child to the right to make room for link
				// (children with multiple parents will be the last child-node;
				// see sort() method)

				if (curDepth + 1 == curNode.getMaxDepth()) {
//					LOG.info("adding hidden child (1)");
					str.append("{").append(printKeyValue("hidden", true)).append("}");
				}

				// only print child-node at lowest-down level
				return false;

				// this parent is the lowest-down parent
			} else {
				// node was already shown
				if (curNode.isShown())
					return false;

				curNode.setShown(true);

				// child is not yet shown:
				// if no siblings, first add hidden child to "pull" workflow back to the right
				if (curParent.getChildren().size() == 1 && curNode.getParents().size() > 1) {
//					LOG.info("adding hidden child (2)");
					str.append("{").append(printKeyValue("hidden", true)).append("},");
				}
			}
		}

		str.append("{");

		str.append(printKeyString("id", curId, true));

		String label = null;
		if (task.hasProperty(RDFS.label))
			label = task.getProperty(RDFS.label).getObject().asLiteral().getString();
		else
			label = task.getLocalName();

		str.append(printKeyString("name", label, true));

		str.append(printKeyValue("composed", link.isComposed(), true));

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

		sort(children);

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
		children.sort((c1, c2) -> {
			Node n1 = c1.getChild();
			Node n2 = c2.getChild();

			// assumes that if one child has an order,
			// all the parent's children have an order
			if (n1.hasOrder())
				return Integer.valueOf(n1.getOrder()).compareTo(n2.getOrder());

			// move all children with multiple parents to the right
			else
				return Integer.valueOf(n1.getSortValue()).compareTo(n2.getSortValue());
		});
	}

	protected class Node {

		private Resource task;
		private List<NodeLink> parents = new ArrayList<>();
		private List<NodeLink> children = new ArrayList<>();

		private int order = -1;
		private boolean shown = false;

		public Node(Resource task) {
			this.task = task;
		}

		public void addParent(Resource entity, Node parent, int depth, boolean composed) {
			// only add the same parent once
			if (!parents.stream().anyMatch(l -> l.getParent().equals(parent))) {
				NodeLink l = new NodeLink(entity, this, parent, depth, composed);

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

		public boolean hasOrder() {
			return order != -1;
		}

		public int getOrder() {
			return order;
		}

		public void setOrder(int order) {
			this.order = order;
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
		private boolean composed;

		public NodeLink(Resource wf, Node node) {
			this.entity = wf;
			this.child = node;
		}

		public NodeLink(Resource entity, Node child, Node parent, int depth, boolean composed) {
			this.entity = entity;
			this.parent = parent;
			this.child = child;
			this.depth = depth;
			this.composed = composed;
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

		public boolean isComposed() {
			return composed;
		}

		public void setComposed(boolean composed) {
			this.composed = composed;
		}

		public String toString() {
			return child.toString();
		}
	}
}
