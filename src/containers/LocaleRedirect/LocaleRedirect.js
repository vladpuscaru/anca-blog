import React from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { languages } from "../../i18n/languages";

const LocaleRedirect = ({children}) => {
    const navigate = useNavigate();
    const {pathname, search, hash} = useLocation();

    const language = pathname.split("/")[1];
    const pathWithoutLanguage = pathname.split("/").filter((path, idx) => idx > 1).join("") + search + hash;

    const onLocaleChange = (newLocale) => {
        if (Object.keys(languages).indexOf(newLocale) !== -1) {
            navigate(`${newLocale}/${pathWithoutLanguage}`);
        }
    }

    const redirectToEn = !language
        || language === ""
        || Object.keys(languages).indexOf(language) === -1

    return redirectToEn ?
        <Navigate to={`/en/${pathWithoutLanguage}`}/>
        :
        React.cloneElement(children, {
                locale: language,
                changeLocale: onLocaleChange
            }
        );
}

export default LocaleRedirect;