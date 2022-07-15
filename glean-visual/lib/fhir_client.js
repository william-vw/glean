// var config = {
//     // FHIR server base url
//     baseUrl: 'http://localhost:8080/fhir-server/fhir',
//     // auth: {
//     //    bearer: 'token',
//     //    // OR for basic auth
//     //    user: 'user',
//     //    pass: 'secret'
//     // },
//     // Valid Options are 'same-origin', 'include'
//     credentials: 'same-origin',
//     headers: {
//         "Prefer": "return=OperationOutcome"
//     //   'X-Custom-Header': 'Custom Value',
//     //   'X-Another-Custom': 'Another Value',
//     }
// };

var config = {
    baseUrl: 'http://localhost:8080/fhir-server/cig',
    // baseUrl: 'http://ppr.cs.dal.ca:8080/fhir-server/cig',
    headers: {
        'Prefer': 'return=representation'
    },
    credentials: 'include'
};

fhirClient = fhir(config);
