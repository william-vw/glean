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

import java.util.HashMap;
import java.util.Map;

public class ResultTimes {

	protected Map<String, ResultTime> times = new HashMap<String, ResultTime>();

	public ResultTimes(ResultTime... times) {
		for (ResultTime time : times)
			this.times.put(time.getId(), time);
	}

	public void addTime(ResultTime time) {
		if (times.containsKey(time.getId())) {
			ResultTime time2 = times.get(time.getId());

			time2.add(time);

		} else
			times.put(time.getId(), time);
	}

	public void subtractTime(ResultTime time, String fromId) {
		ResultTime time2 = times.get(fromId);

		if (time2 != null) {
			time2.subtract(time);

		} else {
			time.setTime(-time.getTime());

			times.put(fromId, time);
		}
	}

	public ResultTime getTime(String id) {
		return times.get(id);
	}

	public ResultTime getTime() {
		return times.values().iterator().next();
	}

	public String toString() {
		return times.toString();
	}
}
