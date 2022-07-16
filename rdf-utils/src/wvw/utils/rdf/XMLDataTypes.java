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

package wvw.utils.rdf;

public class XMLDataTypes {

	public static final String URI = "http://www.w3.org/2001/XMLSchema#";
	
	public static final String LONG = URI + "long";
	
	public static String getLocalName(String datatype) {
		int dshIdx = datatype.indexOf("#");
		if (dshIdx > 0)
			return datatype.substring(dshIdx + 1);
		else
			return datatype;
	}
}
