package wvw.utils;

import java.util.ArrayList;
import java.util.List;

/**
 * @author wvw
 */

public class ListUtils {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List clone(List list) {
		List newList;
		// if (list instanceof ArrayList)
		// newList = new ArrayList();
		// else
		newList = new ArrayList();

		newList.addAll(list);

		return newList;
	}

	@SuppressWarnings({ "rawtypes" })
	public static List intersect(List... lists) {
		List intersect = null;
		for (List list : lists) {

			if (list == null || list.size() == 0)
				return new ArrayList();

			else if (intersect == null)
				intersect = list;

			else {
				for (int i = 0; i < intersect.size(); i++) {
					Object obj1 = intersect.get(i);

					if (!list.contains(obj1))
						intersect.remove(i--);
				}

				if (intersect.size() == 0)
					return new ArrayList();
			}
		}

		return intersect;
	}
	
	@SuppressWarnings({ "rawtypes" })
	public static boolean equals(List list1, List list2) {
		if (list1.size() != list2.size())
			return false;
		
		return subsumes(list1, list2);
	}

	@SuppressWarnings({ "rawtypes" })
	public static boolean subsumes(List list1, List list2) {
		for (Object o2 : list2) {
			if (!list1.contains(o2))
				return false;
		}

		return true;
	}
	
	@SuppressWarnings({ "rawtypes" })
	public static boolean intersects(List list1, List list2) {
		for (Object o2 : list2) {
			if (list1.contains(o2))
				return true;
		}

		return false;
	}


	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void add(List src, List target, boolean checkDupl) {
		if (checkDupl) {

			for (Object obj : src) {
				if (!target.contains(obj))

					target.add(obj);
			}

		} else
			target.addAll(src);
	}
}
