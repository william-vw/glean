package wvw.cig.fhir;

import org.hl7.fhir.dstu3.model.HumanName;
import org.hl7.fhir.dstu3.model.Patient;
import org.hl7.fhir.instance.model.api.IBaseResource;

import ca.uhn.fhir.context.FhirContext;

public class Test {

	public static void main(String[] args) {
		FhirContext ctx = FhirContext.forDstu3();

		Patient patient = new Patient();

		// you can use the Fluent API to chain calls
		// see http://hapifhir.io/doc_fhirobjects.html
		patient.addName().setUse(HumanName.NameUse.OFFICIAL).addPrefix("Mr").setFamily("Fhirman")
				.addGiven("Sam");
		patient.addIdentifier().setSystem("http://ns.electronichealth.net.au/id/hi/ihi/1.0")
				.setValue("8003608166690503");

		String rdf = ctx.newRDFParser().setPrettyPrint(true).encodeResourceToString(patient);
		System.out.println(rdf);
		System.out.println();
		
		IBaseResource r = ctx.newRDFParser().parseResource(rdf);
		System.out.println(r.getClass());
	}

}
