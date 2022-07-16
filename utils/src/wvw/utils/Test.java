package wvw.utils;

import java.util.ArrayList;
import java.util.List;

import javax.swing.text.Style;
import javax.swing.text.StyledDocument;

public class Test {

	public static void main(String[] args) {
		TheValueStyler styler = new Test().new TheValueStyler();
		styler.processTheValue("starting here <demph>hello world</demph> some more <demph>text</demph> here");
		styler.applyTheValueStyles(null);
	}
	
	private class TheValueStyler {

		private String[] tagNames = { "demph" };
		private String[] styles = { "someStyle" };

		private List<Integer> startIdxs = new ArrayList<>();
		private List<Integer> endIdxs = new ArrayList<>();
		private List<String> foundStyles = new ArrayList<>();

		public String processTheValue(String theVal) {
			for (int i = 0; i < tagNames.length; i++) {
				String tagName = tagNames[i];
				String startTag = "<" + tagName + ">";
				String endTag = "</" + tagName + ">";

				while (theVal.contains(startTag)) {
					int startIdx = theVal.indexOf(startTag);
					int endIdx = theVal.indexOf(endTag, startIdx);

					theVal = theVal.substring(0, startIdx)
							+ theVal.substring(startIdx + startTag.length(), endIdx)
							+ theVal.substring(endIdx + endTag.length());
					
					startIdxs.add(startIdx);
					endIdxs.add(endIdx - startTag.length());
					foundStyles.add(styles[i]);
				}
			}

			return theVal;
		}

		public void applyTheValueStyles(StyledDocument doc) {
			System.out.println("styles? " + startIdxs + " - " + endIdxs + " - " + foundStyles);

			for (int i = 0; i < startIdxs.size(); i++) {
				int startIdx = startIdxs.get(i);
				int endIdx = endIdxs.get(i);
//				Style style = foundStyles.get(i);

//				doc.setCharacterAttributes(startIdx, endIdx - startIdx, commentedOutStyle, true);
			}
		}
	}
}
