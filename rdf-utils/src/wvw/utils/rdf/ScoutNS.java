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

public class ScoutNS {

	
    public final static String UM_URI = "http://wvw.ca/ns/user-model#";
    
    public final static String USER_TYPE = UM_URI + "User";
    
    
    public final static String PM_URI = "http://wvw.ca/ns/proximity-model#";
    
    public final static String AREA = PM_URI + "Area";
    public final static String IS_APP = PM_URI + "appended";
    
    public final static String IS_NEARBY = PM_URI + "isNearby";
    public final static String WAS_NEARBY = PM_URI + "wasNearby";
    public final static String CONTAINS = PM_URI + "contains";
    public final static String DIRECT_CONTAINS = PM_URI + "directlyContains";
    public final static String CONTAINED_IN = PM_URI + "containedIn";
    public final static String DIRECT_CONTAINED_IN = PM_URI + "directlyContainedIn";
    public final static String CONTAINED = PM_URI + "contained";
    public final static String DIRECT_CONTAINED = PM_URI + "directlyContained";
    public final static String WAS_CONTAINED_IN = PM_URI + "wasContainedIn";
    public final static String WAS_DIRECT_CONTAINED_IN = PM_URI + "wasDirectlyContainedIn";
    public final static String LAST_KNOWN_LOC = PM_URI + "lastKnownLocation";
    public final static String IS_INF = PM_URI + "isInferred";
    public final static String USED_FOR_INF = PM_URI + "usedForInference";

    public final static String TIME_URI = "http://wvw.ca/ns/time#";
    
    public final static String FROM = TIME_URI + "from";
    public final static String TILL = TIME_URI + "until";
    
    public static final String ESM_URI = "http://wvw.ca/ns/env-state-model#";
    public final static String OBTAINED_ON = ESM_URI + "obtainedAt";
    public final static String OBTAINED_BY = ESM_URI + "obtainedBy";
    public final static String OBTAINED_VIA = ESM_URI + "obtainedVia";
    public final static String LATEST_VALUE = ESM_URI + "latestValue";
    
    public static boolean isPMPredicate(String predicate) {
    	return predicate.equals(IS_NEARBY) ||
    		predicate.equals(WAS_NEARBY) ||
    		predicate.equals(CONTAINS) ||
    		predicate.equals(CONTAINED_IN) ||
    		predicate.equals(CONTAINED) ||
    		predicate.equals(WAS_CONTAINED_IN);
    }
}
