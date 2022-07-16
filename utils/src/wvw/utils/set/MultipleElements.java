package wvw.utils.set;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class MultipleElements<T> implements Elements<T> {

	private ArrayList<T> elements = new ArrayList<>();

	public MultipleElements() {
	}

	public MultipleElements(ArrayList<T> elements) {
		this.elements = elements;
	}

	public void add(T element) {
		elements.add(element);
	}

	public int size() {
		return elements.size();
	}

	public ArrayList<T> getElements() {
		return elements;
	}

	public void setElements(ArrayList<T> elements) {
		this.elements = elements;
	}

	public Elements<T> toSingleElement() {
		return new SingleElement<T>(elements.get(0));
	}

	public <S> Elements<S> mapWith(Function<T, S> mapFn) {
		// @formatter:off
		return new MultipleElements<S>(elements.stream()
				.map(e -> mapFn.apply(e))
				.collect(Collectors.toCollection(ArrayList::new)));
		// @formatter:on
	}

	@Override
	public Iterator<T> iterate() {
		return elements.iterator();
	}

	public String toString() {
		return elements.toString();
	}
}
