/**
 * Copyright 2016 William Van Woensel

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 * 
 * 
 * @author wvw
 * 
 */
package wvw.utils.timer;

public class ExperimentTimer {

	protected String id;

	protected long start;
	protected long end;

	protected ResultTimes resultTimes;

	public ExperimentTimer(String id) {
		this.id = id;

		this.resultTimes = createTimes();
	}

	public ExperimentTimer(String id, ResultTimes resultTimes) {
		this.id = id;

		this.resultTimes = resultTimes;
	}

	public ResultTimes getTimes() {
		return resultTimes;
	}

	public void setTimes(ResultTimes resultTimes) {
		this.resultTimes = resultTimes;
	}
	
	public ResultTime getTime(String id) {
		return resultTimes.getTime(id);
	}
	
	public ResultTime getTime() {
		return resultTimes.getTime();
	}

	public void begin() {
		this.start = System.nanoTime();
		// this.start = System.currentTimeMillis();
	}

	public ResultTime done() {
		// this.end = System.currentTimeMillis();
		this.end = System.nanoTime();

		ResultTime time = result();
		if (resultTimes != null) {

			resultTimes.addTime(time);
		}

		return time;
	}

	public void none() {
		this.start = 0;
		this.end = 0;

		if (resultTimes != null)
			resultTimes.addTime(result());
	}

	private ResultTime result() {
		return createTime(id, (long) ((end - start) / Math.pow(10, 6)));

		// return createTime(id, (long) (end - start));
	}

	protected ResultTimes createTimes() {
		return new ResultTimes();
	}
	
	protected ResultTime createTime(String id, long length) {
		return new ResultTime(id, length);
	}

	public String toString() {
		return resultTimes.toString();
	}
}
