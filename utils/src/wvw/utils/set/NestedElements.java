package wvw.utils.set;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.function.Function;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class NestedElements<T> {

	@XmlElementWrapper
	@XmlElementRefs({ @XmlElementRef(type = MultipleElements.class), @XmlElementRef(type = SingleElement.class) })
	private ArrayList<Elements<T>> nested = new ArrayList<>();

	public NestedElements() {
	}

	public void add(Elements<T> elements) {
		nested.add(elements);
	}

	public int size() {
		return nested.size();
	}

	public ArrayList<Elements<T>> getNested() {
		return nested;
	}

	public void setNested(ArrayList<Elements<T>> nested) {
		this.nested = nested;
	}

	public Iterator<Elements<T>> iterate() {
		return nested.iterator();
	}

	public <S> NestedElements<S> mapWith(Function<T, S> mapFn) {
		NestedElements<S> ret = new NestedElements<>();

		for (Elements<T> n : nested)
			ret.add(n.mapWith(mapFn));

		return ret;
	}

	public String toString() {
		return nested.toString();
	}
}
