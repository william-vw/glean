package wvw.utils;

import java.util.ArrayList;
import java.util.List;

import wvw.utils.log.Log;

/**
 * A utility class for performing all sorts of combinations.
 * 
 * @author wvw
 *
 */
@SuppressWarnings("unused")
public class CombinationUtils {

	private static int resCtr = 0;
	private static int[][] output;

	/**
	 * Calculates permutations without duplication with size {@code num}. Calls
	 * {@link CombinationListener#combination(int[])} for each found
	 * permutation. For instance, for {@code num = 3}, this method will yield 3!
	 * calls.
	 * 
	 * In case {@link CombinationListener#doPrune()} returns true, it also calls
	 * {@link CombinationListener#prune(int[], int, int)} for each new part of a
	 * permutation to prune the search space.
	 * 
	 * 
	 * @param num
	 *            size of the permutations.
	 * @param listener
	 *            listener for receiving new permutations and potentially
	 *            pruning the search space.
	 */
	public static void permute(int num, CombinationListener listener) {
		if (listener.doPrune())
			permute2_pruned(num, listener);
		else
			permute2(num, listener);
	}

	// comment "collect results" part in permute1, permute2
	// before running performance tests
	private static void testPerformance() {
		CombinationListener listener = new TestCombinationListener();

		double total = 0;
		int nrRuns = 1;

		int num = 3;

		for (int i = 0; i < nrRuns; i++) {
			long start = System.nanoTime();
			permute2(num, listener);
			long end = System.nanoTime();

			double time = ((end - start) / Math.pow(10, 6));
			Log.d("\n\ntime: " + time + "\n\n");

			total += time;
		}

		Log.d("\n\navg: " + (total / nrRuns));
	}

	// Total for 10 runs:
	// permute1: ca. 380ms
	// permute2: ca. 113ms

	private static void permute1(int num) {
		// start: collect results
		output = new int[fac(num)][num];
		// end: collect results

		resCtr = 0;

		int[] cnts = new int[num];
		for (int i = 0; i < num - 1; i++)
			cnts[i] = num - 1 - i;
		cnts[num - 1] = -1;

		int[] cur = new int[num];
		System.arraycopy(cnts, 0, cur, 0, cnts.length);

		int[] ctrs = new int[num];
		int[] res = new int[num];

		int idx = 0;
		while (true) {

			if (cur[idx] >= 0 || idx == num - 1) {
				for (int i = 0; i < idx; i++) {

					if (res[i] == ctrs[idx]) {
						ctrs[idx]++;

						i = -1;
					}
				}

				res[idx] = ctrs[idx]++;
			}

			if (cur[idx]-- < 0) {
				if (idx == 0)
					break;

				if (idx == num - 1) {

					// start: collect results
					int[] res2 = new int[num];
					System.arraycopy(res, 0, res2, 0, res2.length);

					output[resCtr] = res2;
					// end: collect results

					resCtr++;

					// Log.d("result! " + OutputUtils.toString(res)
					// +
					// "\n");
				}

				cur[idx] = cnts[idx];
				ctrs[idx] = 0;

				idx--;

			} else
				idx++;
		}

		Log.d("# results? " + resCtr);

		// start: collect results
		checkOutput(output);
		// end: collect results
	}

	// private void print1(int idx, int[] cur, int[] ctrs, int[] res) {
	// Log.d("idx: " + idx);
	// Log.d("cur: " + OutputUtils.toString(cur));
	// Log.d("ctrs: " + OutputUtils.toString(ctrs));
	// Log.d("ret: " + OutputUtils.toString(res) + "\n");
	// }

	private static void permute2(int num, CombinationListener listener) {
		// start: collect results
		// output = new int[fac(num)][num];

		// resCtr = 0;
		// end: collect results

		// makes sure we get all combinations, without duplication.
		// per level, this keeps how many choices remain.
		// (e.g., 3, 2, 1) for num = 3 (3!).
		int[] cnts = new int[num];
		for (int i = 0; i < num - 1; i++)
			cnts[i] = num - 1 - i;
		cnts[num - 1] = -1;

		// at runtime, this array is instantiated with cnts[].
		// used to keep how many distinct numbers should be chosen
		// before going back up a level.
		int[] cur = new int[num];
		System.arraycopy(cnts, 0, cur, 0, cnts.length);

		// keeps which numbers have already been taken.
		// used by lower levels to avoid re-using numbers already occurring in
		// the permutation.
		boolean[] taken = new boolean[num];
		// keeps track of the current count at a particular "level"
		int[] ctrs = new int[num];

		// per level, points to the corresponding entry in taken[] (if any).
		// when choosing the next number at a particular level, this is used
		// to reset the previously chosen number in taken[].
		int[] ptrs = new int[num];
		init(ptrs);

		// the current permutation
		int[] res = new int[num];
		init(res);

		int idx = 0;
		while (true) {

			if (cur[idx] >= 0 || idx == num - 1) {

				// choose next number that is not yet taken
				while (taken[ctrs[idx]])
					ctrs[idx]++;

				// indicate to lower levels that this number
				// is now taken
				taken[ctrs[idx]] = true;

				// if needed, reset previous choice
				if (ptrs[idx] != -1)
					taken[ptrs[idx]] = false;

				// update result & do housekeeping
				res[idx] = ctrs[idx];
				ptrs[idx] = res[idx];
			}

			// if no more choices are left at this level, go back up
			if (cur[idx]-- < 0) {
				if (idx == 0)
					break;

				// if we're at the last level, this means we have a
				// new permutation to report
				if (idx == num - 1) {
					// start: collect results
					// int[] res2 = new int[num];
					// System.arraycopy(res, 0, res2, 0, res2.length);
					//
					// output[resCtr] = res2;
					//
					// resCtr++;
					// end: collect results

					listener.combination(res);
				}

				// reset to initial cnt
				cur[idx] = cnts[idx];
				// number is no longer taken
				taken[ptrs[idx]] = false;
				// do housekeeping
				ptrs[idx] = -1;
				ctrs[idx] = 0;

				// "go up" one level
				idx--;

			} else
				// else, go down the next level
				idx++;
		}

		// start: collect results
		// Log.d("# results? " + resCtr);
		// checkOutput(output);
		// end: collect results
	}

	// (for extra comments, see permute2(..))
	// to check the correctness of this method, see testPermute2Pruned(..)
	private static void permute2_pruned(int num, CombinationListener listener) {
		// start: collect results
		// output = new int[fac(num)][num];
		//
		// resCtr = 0;
		// end: collect results

		int[] cnts = new int[num];
		for (int i = 0; i < num - 1; i++)
			cnts[i] = num - 1 - i;
		cnts[num - 1] = -1;

		int[] cur = new int[num];
		System.arraycopy(cnts, 0, cur, 0, cnts.length);

		boolean[] taken = new boolean[num];
		int[] ctrs = new int[num];

		int[] ptrs = new int[num];
		init(ptrs);

		int[] res = new int[num];
		init(res);

		int idx = 0;
		while (true) {

			if (cur[idx] >= 0 || idx == num - 1) {

				// increment ctr until one is found that is
				// a) not yet taken, and b) not pruned
				while (true) {
					// quit if no free ctr is found
					if (ctrs[idx] == num)
						break;

					if (!taken[ctrs[idx]]) {

						if (listener.prune(res, idx, ctrs[idx])) {
							// when pruning, this is also considered a "choice"
							// at this level (just not leading to a permutation)
							cur[idx]--;
							ctrs[idx]++;

						} else
							break;

					} else
						ctrs[idx]++;
				}

				if (ctrs[idx] < num) {
					taken[ctrs[idx]] = true;

					if (ptrs[idx] != -1)
						taken[ptrs[idx]] = false;

					res[idx] = ctrs[idx];
					ptrs[idx] = res[idx];
				}
			}

			if (cur[idx]-- < 0) {
				if (idx == 0)
					break;

				if (idx == num - 1 && ctrs[idx] < num) {
					// start: collect results
					// int[] res2 = new int[num];
					// System.arraycopy(res, 0, res2, 0, res2.length);
					//
					// output[resCtr] = res2;
					//
					// resCtr++;
					// end: collect results

					listener.combination(res);
				}

				cur[idx] = cnts[idx];
				if (ptrs[idx] != -1) {
					taken[ptrs[idx]] = false;
					ptrs[idx] = -1;
				}
				ctrs[idx] = 0;

				idx--;

			} else
				idx++;
		}

		// start: collect results
		// Log.d("# results? " + resCtr);
		// checkOutput(output);
		// end: collect results
	}

	// private void print2(int idx, int[] cur, int[] ctrs, boolean[] taken,
	// int[] ptrs, int[] res) {
	// Log.d("idx: " + idx);
	// Log.d("cur: " + OutputUtils.toString(cur));
	// Log.d("ctrs: " + OutputUtils.toString(ctrs));
	// Log.d("taken: " + OutputUtils.toString(taken));
	// Log.d("ptrs: " + OutputUtils.toString(ptrs));
	// Log.d("ret: " + OutputUtils.toString(res) + "\n");
	// }

	private static void init(int[] array) {
		for (int i = 0; i < array.length; i++)
			array[i] = -1;
	}

	private static int fac(int num) {
		int ret = 1;
		for (int i = 0; i < num; i++)
			ret *= num - i;

		return ret;
	}

	// NOTE uncomment "collect results" parts in permute2, permute2_pruned
	private static void testPermute2Pruned() {
		int num = 8;

		CombinationListener listener = new TestCombinationListener();

		permute2(num, listener);
		int[][] output1 = output;

		permute2_pruned(num, listener);
		int[][] output2 = output;
		int nrPrunedRes = resCtr;

		checkPrunedOutput(output1, output2, nrPrunedRes, listener);
	}

	private static void testCheckOutput() {
		// int[][] output = new int[][] { { 0, 1, 2, 3 }, { 0, 2, 3, 1 } };
		int[][] output = new int[][] { { 0, 1, 2, 3 }, { 0, 2, 3, 1 }, { 0, 1, 2, 3 } };
		// int[][] output = new int[][] { { 0, 1, 1, 2 }, { 0, 1, 2, 3 }, { 0,
		// 2, 3, 1 }, { 0, 1, 2, 3 } };

		checkOutput(output);
	}

	private static void checkOutput(int[][] output) {
		for (int i = 0; i < output.length; i++) {
			// Log.d("check1: #" + i);

			int[] result = output[i];

			for (int j = 0; j < result.length; j++)
				for (int k = j + 1; k < result.length; k++) {

					if (result[j] == result[k])
						Log.d("error (1): " + OutputUtils.toString(result));
				}
		}

		for (int i = 0; i < output.length; i++) {
			int[] result1 = output[i];

			for (int j = i + 1; j < output.length; j++) {
				int[] result2 = output[j];

				// Log.d("check2: #" + i + " - " + j);

				boolean match = true;
				for (int k = 0; k < result1.length; k++) {
					if (result1[k] != result2[k]) {
						match = false;

						break;
					}
				}

				if (match)
					Log.d("error (2): " + OutputUtils.toString(result1) + " - " + OutputUtils.toString(result2));
			}
		}
	}

	private static void checkPrunedOutput(int[][] output, int[][] pruned, int nrPrunedRes,
			CombinationListener listener) {
		List<int[]> pruned2Lst = new ArrayList<int[]>();
		for (int i = 0; i < output.length; i++) {

			int[] result = output[i];

			boolean prune = false;
			for (int j = 1; j < result.length; j++) {

				if (listener.prune(result, j, result[j])) {
					prune = true;

					break;
				}
			}

			if (!prune)
				pruned2Lst.add(result);
		}

		int[][] pruned2 = pruned2Lst.toArray(new int[pruned2Lst.size()][output[0].length]);

		Log.d("pruned: " + OutputUtils.toString(pruned) + " (" + nrPrunedRes + ")");
		Log.d("pruned2: " + OutputUtils.toString(pruned2));

		List<int[]> notFound1 = cmp(pruned, nrPrunedRes, pruned2, pruned2.length);
		List<int[]> notFound2 = cmp(pruned2, pruned2.length, pruned, nrPrunedRes);

		if (notFound1.size() > 0) {
			Log.d("\nnot found (pruned > pruned2)");

			for (int[] nf1 : notFound1)
				Log.d(OutputUtils.toString(nf1));
		}

		if (notFound2.size() > 0) {
			Log.d("\nnot found (pruned2 > pruned)");

			for (int[] nf2 : notFound2)
				Log.d(OutputUtils.toString(nf2));
		}
	}

	private static List<int[]> cmp(int[][] array1, int limit1, int[][] array2, int limit2) {
		List<int[]> notFound = new ArrayList<int[]>();

		for (int i = 0; i < limit1; i++) {
			int[] result1 = array1[i];

			boolean found = false;
			for (int j = 0; j < limit2; j++) {
				int[] result2 = array2[j];

				if (cmp(result1, result2)) {
					found = true;

					break;
				}
			}

			if (!found)
				notFound.add(result1);
		}

		return notFound;
	}

	private static boolean cmp(int[] result1, int[] result2) {
		boolean match = true;
		for (int k = 0; k < result1.length; k++) {
			if (result1[k] != result2[k]) {
				match = false;

				break;
			}
		}

		return match;
	}

	/**
	 * Listener interface for receiving combinations and possibly deciding when
	 * to prune.
	 * 
	 * @author wvw
	 *
	 */
	public static interface CombinationListener {

		/**
		 * Called for each possible combination (depending on the called
		 * combination method in {@link CombinationUtils).
		 * 
		 * @param result
		 *            the new combination
		 */
		public void combination(int[] result);

		/**
		 * Returns whether the search space can be pruned.
		 * 
		 * @return prune whether the search space can be pruned.
		 */
		public boolean doPrune();

		/**
		 * If {@link CombinationListener#doPrune()} returns true, this method
		 * will be called for each new choice (value) at each level (idx).
		 * 
		 * When returning true, combinations starting with { result[0], ..
		 * result[idx - 1], value } will not be investigated. This effectively
		 * prunes the search space, meaning associated combinations will not be
		 * investigated.
		 * 
		 * 
		 * @param result
		 *            the combination collected until now (from 0, idx - 1)
		 * @param idx
		 *            current level in the combination
		 * @param value
		 *            current value under consideration
		 * @return prune whether or not to prune combinations starting with
		 *         these values
		 */
		public boolean prune(int[] result, int idx, int value);
	}

	private static class TestCombinationListener implements CombinationListener {

		public void combination(int[] result) {
			// Log.d("result! " + OutputUtils.toString(res) + "\n");
		}

		public boolean doPrune() {
			return true;
		}

		public boolean prune(int[] result, int idx, int value) {
			if (idx > 0) {
				// Log.d("prune: " + (res[idx - 1] + " - " + value));

				if ((result[idx - 1] == 0 && value == 1) || (result[idx - 1] == 1 && value == 0))
					return true;
			}

			return false;
		}
	}
}
