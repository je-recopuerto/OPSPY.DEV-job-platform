import Markdown from "react-markdown";

export default function JobDescription({
  description,
}: {
  description: string | null;
}) {
  description =
    "We are seeking to appoint two ambitious and proactive Research Associates to be part of a multidisciplinary team developing high-fidelity models of cardiovascular fluid dynamics and device-flow/device-tissue interactions through multi-physics and physiological modelling. The candidates will leverage clinical and experimental data, first-principle physics-based simulations, scientific machine-learning approaches, data assimilation, and uncertainty quantification techniques. Integral to this work will also be the application of these techniques to large real-world multimodal datasets, clinical trials datasets and population imaging studies.\n" +
    "What you’ll need\n" +
    "Applicants should have a PhD in computational cardiovascular mechanics and prosthetic valves or related fields and expertise in either computational solid mechanics to analyse soft-tissue deformations and device interactions or computational fluid mechanics to enable analysis of haemodynamics and thrombosis. One of the critical challenges we want to tackle is how to efficiently execute ensembles of virtual experiments entailing. Experience in working with multiphysics and multiscale models and in accelerated methods for solving partial differential equations and scientific machine learning (physics-informed machine learning) is essential. A developing publication profile will be advantageous.\n" +
    "As this role involves research at a postgraduate level, applicants who are not an EEA national or a national of an exempt country and who will require sponsorship under the Skilled Worker route of the UK Visas and Immigration’s (UKVI) Points Based System in order to take up the role, will be required to apply for an Academic Technology Approval Scheme (ATAS) Certificate and will need to obtain this prior to making any official visa application UKVI.\n" +
    "What you will get in return:\n\n" +
    "- Fantastic market leading Pension scheme\n" +
    "- Excellent employee health and wellbeing services including an Employee Assistance Programme\n" +
    "- Exceptional starting annual leave entitlement, plus bank holidays\n" +
    "- Additional paid closure over the Christmas period\n" +
    "- Local and national discounts at a range of major retailers\n\n" +
    "As an equal opportunities employer we welcome applicants from all sections of the community regardless of age, sex, gender (or gender identity), ethnicity, disability, sexual orientation and transgender status. All appointments are made on merit.\n" +
    "Our University is positive about flexible working – you can find out more here\n" +
    "Hybrid working arrangements may be considered.\n" +
    "Please note that we are unable to respond to enquiries, accept CVs or applications from Recruitment Agencies.\n" +
    "Any recruitment enquiries from recruitment agencies should be directed to People.Recruitment@manchester.ac.uk.\n" +
    "Any CV’s submitted by a recruitment agency will be considered a gift.\n" +
    "Enquiries about the vacancy, shortlisting and interviews:\n" +
    "Name: Prof Alejandro Frangi\n" +
    "Email: Alejandro.frangi@mancheser.ac.uk\n" +
    "General enquiries:\n" +
    "Email: People.recruitment@manchester.ac.uk\n" +
    "Technical support:\n" +
    "https://jobseekersupport.jobtrain.co.uk/support/home\n" +
    "This vacancy will close for applications at midnight on the closing date.\n" +
    "Please see the link below for the Further Particulars document which contains the person specification criteria.";

  description = description.replace(/\n/g, "\n\n");

  console.log(description);

  return <Markdown children={description} />;
}
