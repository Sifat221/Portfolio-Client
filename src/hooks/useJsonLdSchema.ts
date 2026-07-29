import { useEffect } from 'react';
import { IPersonalProfile } from '../types/portfolio';

export const useJsonLdSchema = (personal: IPersonalProfile): void => {
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": personal.name,
      "jobTitle": personal.title,
      "email": personal.email,
      "telephone": personal.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": personal.location
      },
      "sameAs": [
        personal.github,
        personal.portfolio
      ],
      "knowsAbout": ["Flutter", "Dart", "BLoC Architecture", "REST API", "Firebase", "Mobile Engineering"]
    };

    let scriptTag = document.getElementById("json-ld-schema");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-schema";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [personal]);
};
