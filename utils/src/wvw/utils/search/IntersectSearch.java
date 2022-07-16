package wvw.utils.search;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.google.common.collect.Sets;

public abstract class IntersectSearch {

	public static void main(String[] args) {
		IntersectSearch s = new TestIntersectSearch();

		List<Object> containers = new ArrayList<>(Arrays.asList(new TestContainer("c1", "a", "b", "c"),
				new TestContainer("c2", "b", "c"), new TestContainer("c3", "a", "b")));

		List<IntersectMatch> matches = s.searchIntersect(containers);
		System.out.println(matches);
	}

	public List<IntersectMatch> searchIntersect(List<Object> containers) {
		List<IntersectMatch> ret = new ArrayList<>();

		Set<Set<Object>> ps = Sets.powerSet(new HashSet<>(containers));
		for (Set<Object> s : ps) {
			if (s.size() < 2)
				continue;

			Iterator<Object> it = s.iterator();
			List<Object> intersect = getItems(it.next());
			while (it.hasNext())
				intersect.retainAll(getItems(it.next()));

			if (!intersect.isEmpty())
				newMatch(new IntersectMatch(s, intersect), ret);
		}

		return ret;
	}

	private void newMatch(IntersectMatch m, List<IntersectMatch> ret) {
		Iterator<IntersectMatch> matchIt = ret.iterator();

		while (matchIt.hasNext()) {
			IntersectMatch m2 = matchIt.next();

			switch (m.subsumes(m2)) {
			case 1:
				matchIt.remove();
				break;

			case -1:
				return;
			}
		}

		ret.add(m);
	}

	protected abstract List<Object> getItems(Object container);

	protected abstract String getLabel(Object item);

	public class IntersectMatch {

		private Collection<Object> containers;
		private Collection<Object> intersect;

		public IntersectMatch(Collection<Object> containers, Collection<Object> intersect) {
			this.containers = containers;
			this.intersect = intersect;
		}

		public Collection<Object> getContainers() {
			return containers;
		}

		public Collection<Object> getIntersect() {
			return intersect;
		}

		public int subsumes(IntersectMatch m) {
			if (intersect.size() != m.getIntersect().size())
				return 0;

			if (containers.size() > m.getContainers().size()) {
				if (containers.containsAll(m.getContainers()))
					return 1;
			} else {
				if (m.getContainers().containsAll(containers))
					return -1;
			}

			return 0;
		}

		public String toString() {
			return "containers: " + containers.stream().map(c -> getLabel(c)).collect(Collectors.joining("; ")) + "\n"
					+ "intersect: " + intersect + "\n";
		}
	}

	public static class TestIntersectSearch extends IntersectSearch {

		@Override
		protected List<Object> getItems(Object container) {
			return ((TestContainer) container).getItems();
		}

		@Override
		protected String getLabel(Object item) {
			return ((TestContainer) item).getId();
		}
	}

	public static class TestContainer {

		private String id;
		private List<Object> items;

		public TestContainer(String id, List<Object> items) {
			this.id = id;
			this.items = items;
		}

		public TestContainer(String id, Object... items) {
			this.id = id;
			this.items = new ArrayList<>(Arrays.asList(items));
		}

		public String getId() {
			return id;
		}

		public List<Object> getItems() {
			return items;
		}

		public String toString() {
			return id;// + ": " + items.toString();
		}
	}
}