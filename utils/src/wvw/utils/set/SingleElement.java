package wvw.utils.set;

import java.util.Iterator;
import java.util.function.Function;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import wvw.utils.iterator.SingleElementIterator;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class SingleElement<T> implements Elements<T> {

	private T element;

	public SingleElement() {
	}

	public SingleElement(T element) {
		this.element = element;
	}

	public <S> Elements<S> mapWith(Function<T, S> mapFn) {
		return new SingleElement<S>(mapFn.apply(element));
	}

	public T getElement() {
		return element;
	}

	public void setElement(T element) {
		this.element = element;
	}
	
	public int size() {
		return 1;
	}

	@Override
	public Iterator<T> iterate() {
		return new SingleElementIterator<>(element);
	}

	public String toString() {
		return element.toString();
	}
}
