package wvw.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import wvw.utils.log.Log;

/**
 * @author wvw
 */

// TODO turn off ERROR checks when running benchmarks
public class Timer {

	public static boolean dropFirstRun = true;

	private static List<TimeEntry> stack = new LinkedList<TimeEntry>();

	private static Map<String, TimeEntry> times;
	private static List<Map<String, TimeEntry>> allTimes = new ArrayList<Map<String, TimeEntry>>();

	public static void newRun() {
		if (times == null || !times.isEmpty()) {
			times = new OrderedMap<String, TimeEntry>();

			allTimes.add(times);
		}
	}

	public static void start(String tag) {
		if (times == null)
			return;

		if (!stack.isEmpty()) {
			if (stack.get(stack.size() - 1).getBaseTag().equals(tag)) {
				Log.e("ERROR: recursive timer start: " + tag);

				return;
			}
		}

		String stackTag = createStackTag(tag);

		TimeEntry entry = times.get(stackTag);
		if (entry == null) {
			entry = new TimeEntry(tag);

			times.put(stackTag, entry);

		} else if (entry.hasStart()) {
			Log.e("ERROR: starting '" + tag + "' again without stop()");

			return;
		}

		stack.add(entry);

		entry.start();

		System.out.println("START " + tag);
	}

	public static void end(String tag) {
		if (times == null)
			return;

		TimeEntry entry = stack.remove(stack.size() - 1);
		if (!entry.getBaseTag().equals(tag)) {
			Log.e("ERROR: stopping '" + tag + "' before '" + entry.getBaseTag() + "' is stopped");

			return;
		}

		if (!entry.hasStart()) {
			Log.e("ERROR: start() not called for tag '" + tag + "'");

			return;
		}

		entry.end();

		System.out.println("END " + tag);
	}

	public static void count(String tag) {
		count(tag, 1);
	}

	public static void count(String tag, int nr) {
		if (times == null)
			return;

		String stackTag = createStackTag(tag);

		TimeEntry entry = times.get(stackTag);
		if (entry == null) {
			entry = new TimeEntry(tag);

			times.put(stackTag, entry);
		}

		entry.incrCnt(nr);
	}

	public static void reset() {
		stack.clear();
		allTimes.clear();

		times = null;
	}

	private static String createStackTag(String baseTag) {
		StringBuffer str = new StringBuffer();

		for (TimeEntry entry : stack)
			str.append(entry.getBaseTag()).append("/");

		str.append(baseTag);

		return str.toString();
	}

	public static void printTimes() {
		if (!stack.isEmpty())
			Log.e("ERROR: Timer.stack not empty:\n" + stack);

		times.entrySet().stream().forEach(e -> {
			double ms = (((double) e.getValue().getTime()) / 1000000);
			double sec = (((double) e.getValue().getTime()) / 1000000000);

			System.out.println(e.getKey() + ": " + ms + " ms");
		});
	}

	public static String toCsv() {
		if (!stack.isEmpty())
			Log.e("ERROR: Timer.stack not empty:\n" + stack);

		StringBuffer str = new StringBuffer();

		str.append(";times\n");

		// str.append(";all\n");
		// str.append(";run;tag;time;cnt\n");
		//
		// // ;run;tag;time;cnt
		// for (int run = 0; run < allTimes.size(); run++) {

		// if (allTimes.size() > 1 && run == 0 && dropFirstRun)
		// continue;
		//
		// Map<String, TimeEntry> times = allTimes.get(run);
		//
		// Iterator<String> tagIt = times.keySet().iterator();
		// while (tagIt.hasNext()) {
		// String tag = tagIt.next();
		//
		// TimeEntry entry = times.get(tag);
		// double time = nanoToMillis(entry.getTime());
		//
		// str.append(";").append(run).append(";").append(tag).append(";").append(time).append(";").append(entry.getCnt())
		// .append("\n");
		// }
		// }
		//
		// str.append("\n\n");

		// str.append("totals\n");
		str.append(";tag;totalTime;totalCnt;avgTime;avgCnt\n");

		int nrRuns = allTimes.size() - (dropFirstRun ? 1 : 0);
		Map<String, TimeEntry> totals = getTotals();

		// ;tag;totalTime;totalCnt;avgTime;avgCnt

		Iterator<String> tagIt = totals.keySet().iterator();
		while (tagIt.hasNext()) {

			String tag = tagIt.next();
			TimeEntry total = totals.get(tag);

			double totalTime = nanoToMillis(total.getTime());
			// double totalTime = total.getTime();

			long totalCnt = total.getCnt();

			double avgTime = Math.round((double) totalTime / nrRuns);
			double avgCnt = Math.round((double) totalCnt / nrRuns);

			str.append(";").append(tag).append(";").append(totalTime).append(";").append(totalCnt).append(";")
					.append(avgTime).append(";").append(avgCnt).append("\n");
		}

		str.append("\n\n");

		return str.toString();
	}

	private static Map<String, TimeEntry> getTotals() {
		Map<String, TimeEntry> totals = new OrderedMap<String, TimeEntry>();

		for (int run = 0; run < allTimes.size(); run++) {

			if (allTimes.size() > 1 && run == 0 && dropFirstRun)
				continue;

			Map<String, TimeEntry> times = allTimes.get(run);

			Iterator<String> tagIt = times.keySet().iterator();
			while (tagIt.hasNext()) {

				String tag = tagIt.next();
				TimeEntry entry = times.get(tag);

				if (!totals.containsKey(tag))
					totals.put(tag, entry.clone());

				else {
					TimeEntry total = totals.get(tag);

					total.combine(entry);
				}
			}
		}

		return totals;
	}

	private static long nanoToMillis(long time) {
		return Math.round((double) time / Math.pow(10, 6));
	}

	private static class TimeEntry {

		private String baseTag;

		private long start = -1;
		private long time = 0;
		private int cnt = 0;

		public TimeEntry(String baseTag) {
			this.baseTag = baseTag;
		}

		public TimeEntry(String baseTag, long time, int cnt) {
			this.baseTag = baseTag;

			this.time = time;
			this.cnt = cnt;
		}

		public String getBaseTag() {
			return baseTag;
		}

		public void start() {
			this.start = System.nanoTime();
			// this.start = System.currentTimeMillis();
		}

		public boolean hasStart() {
			return start != -1;
		}

		public void end() {
			long end = System.nanoTime();
			// long end = System.currentTimeMillis();

			this.time += (end - start);
			cnt++;

			this.start = -1;
		}

		public void incrCnt(int nr) {
			cnt += nr;
		}

		public long getTime() {
			return time;
		}

		public int getCnt() {
			return cnt;
		}

		public TimeEntry clone() {
			return new TimeEntry(baseTag, time, cnt);
		}

		public void combine(TimeEntry time) {
			this.time += time.getTime();

			this.cnt += time.getCnt();
		}

		public String toString() {
			return "{ " + baseTag + ": " + time + " - " + cnt + " }";
		}
	}
}
