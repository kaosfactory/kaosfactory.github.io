(function() {
    window.dataLayer = window.dataLayer || [];

    const loadGTM = env => {
        // staging
        // (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        // j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        // 'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=FPpdAeErJ8SvJmyCV0lu0A&gtm_preview=env-17&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
        // })(window,document,'script','dataLayer','GTM-MKGV2DK');
        
        // prod
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=RC9lQBST9YIW5Zd0du2-0A&gtm_preview=env-2&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MKGV2DK');
    };

	const getCookie = (name) => {
        function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        return match ? match[1] : null;
    }

    const parseJsonCookie = (cookie) => {
        try {
            const json = JSON.parse(decodeURIComponent(cookie));
            return json;
        } catch (err) {
            throw err;
        }
    }

    const pushToDataLayer = (data) => {
        window.dataLayer.push({ event: "userData", ...data })
    };

    const omitFalsy = (obj) => {
        return Object.keys(obj).reduce((newObj, key) => {
			if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
				newObj[key] = obj[key];
			}
			return newObj;
		}, {});
    }

	try {
        const googleIds = parseJsonCookie(getCookie('google_ids'));
        
        pushToDataLayer(
            omitFalsy(
                { 
                    user_google_user_id: googleIds !== null && typeof googleIds === 'object' ? googleIds.google_userId : null,
                    user_google_click_id: googleIds !== null && typeof googleIds === 'object' ? googleIds.google_clickId : null,
                    user_google_gid: googleIds !== null && typeof googleIds === 'object' ? googleIds.google_gid : null,
                    user_google_client_id: googleIds !== null && typeof googleIds === 'object' ? googleIds.google_clientId : null,
                    user_id: getCookie('user_id')
                } 
            )
        );
    } catch (err) {
        console.log(err);
    }

    loadGTM();


    /// append hidden values to forms marked '.js-analytics-form' to flow through web_to_lead
    window.onload = () => {
        const forms = document.querySelectorAll('.js-analytics-form');

        forms.forEach(form => {
            const googleIdsCookie = getCookie('google_ids');
            const utmCookie = getCookie('utm_parameters');
            console.log(googleIdsCookie);
            const hiddenInputsMarkup = `
                <input type="hidden" readonly name="utm" value='${utmCookie || ""}'>	
                <input type="hidden" readonly  name="google_ids" value='${googleIdsCookie || ""}'>	
            `;
            const div = document.createElement('div');
            div.innerHTML = hiddenInputsMarkup;
            form.appendChild(div);
        });
    };

})();