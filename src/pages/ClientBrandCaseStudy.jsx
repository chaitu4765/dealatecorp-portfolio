import { ClientMediaGallery } from "../components/ClientMediaGallery.jsx";
import ganesh from "../data/client-case-studies/ganesh-constructions.html?raw";
import spark from "../data/client-case-studies/spark.html?raw";
import sreeSurya from "../data/client-case-studies/sree-surya-infra.html?raw";
import sriConventions from "../data/client-case-studies/sri-conventions.html?raw";
import parasakthi from "../data/client-case-studies/sri-parasakthi-peetam.html?raw";
import sriVenkateswara from "../data/client-case-studies/sri-venkateswara-constructions.html?raw";
import ssm from "../data/client-case-studies/ssm-construction.html?raw";
import ubic from "../data/client-case-studies/ubic.html?raw";

const caseStudies = {
  "/clients/ganesh-constructions": {
    rootClass: "ganesh-case",
    markup: ganesh,
  },
  "/clients/spark": { rootClass: "spark-case", markup: spark },
  "/clients/sree-surya-infra": {
    rootClass: "sree-surya-case",
    markup: sreeSurya,
  },
  "/clients/sri-conventions": {
    rootClass: "sri-conventions-case",
    markup: sriConventions,
  },
  "/clients/sri-parasakthi-peetam": {
    rootClass: "parasakthi-case",
    markup: parasakthi,
  },
  "/clients/sri-venkateswara-constructions": {
    rootClass: "svc-case",
    markup: sriVenkateswara,
  },
  "/clients/ssm-construction": { rootClass: "ssm-case", markup: ssm },
  "/clients/ubic": { rootClass: "ubic-case", markup: ubic },
};

export const clientBrandCaseStudyPaths = Object.keys(caseStudies);

export function ClientBrandCaseStudy({ path }) {
  const caseStudy = caseStudies[path];
  if (!caseStudy) return null;
  const [before, after = ""] = caseStudy.markup.split(
    "<!-- CLIENT_MEDIA_GALLERY -->",
  );
  return (
    <main className={caseStudy.rootClass}>
      <div
        className="client-case-fragment"
        dangerouslySetInnerHTML={{ __html: before }}
      />
      <ClientMediaGallery path={path} />
      <div
        className="client-case-fragment"
        dangerouslySetInnerHTML={{ __html: after }}
      />
    </main>
  );
}
