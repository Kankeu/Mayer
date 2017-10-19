<template>
    <div @click="close">
        <md-layout class="grille" md-gutter>
            <md-layout md-flex="50" md-column md-flex-xsmall="100" md-flex-medium="50">
                <md-stepper>
                    <md-step :md-editable="false" md-button-continue="continuer" md-button-back=" ">
                        <p>Première étape: remplissez ce formulaire puis cliquez sur continuer</p>
                        <md-whiteframe md-elevation="3">
                            <form v-validateForm="store" class="inscrire">
                                <md-input-container v-validate="'required'">
                                    <label>Nom</label>
                                    <md-input type="text" name="name" required></md-input>
                                    <span class="md-error"></span>
                                </md-input-container>
                                <md-input-container v-validate="'required'">
                                    <label>Prenom</label>
                                    <md-input type="text" name="forename" required></md-input>
                                    <span class="md-error"></span>
                                </md-input-container>
                                <md-input-container v-validate="'required|email'">
                                    <label>Email</label>
                                    <md-input type="email" name="email" required></md-input>
                                    <span class="md-error"></span>
                                </md-input-container>
                                <md-layout class="date" gutter>
                                    <md-layout md-flex="30" md-flex-small="100">
                                        <md-input-container v-validate="'required'">
                                            <md-select name="jour" placeholder="Jour" >
                                                <md-option :value="i" v-for="i in 31">{{i}}</md-option>
                                            </md-select>
                                            <span class="md-error"></span>
                                            <md-tooltip md-direction="left">Jour de naissance</md-tooltip>
                                        </md-input-container>
                                    </md-layout>
                                    <md-layout md-flex="30" md-flex-small="100">
                                        <md-input-container v-validate="'required'">
                                            <md-select name="mois" placeholder="Mois">
                                                <md-option :value="item" v-for="item,i in mois">{{item}}</md-option>
                                            </md-select>
                                            <span class="md-error"></span>
                                            <md-tooltip md-direction="top">Mois de naissance</md-tooltip>
                                        </md-input-container>
                                    </md-layout>
                                    <md-layout md-flex="30" md-flex-small="100">
                                        <md-input-container v-validate="'required'">
                                            <md-select name="annee" placeholder="Année">
                                                <md-option :value="2010-i" v-for="i in 101">{{2010-i}}</md-option>
                                            </md-select>
                                            <span class="md-error"></span>
                                            <md-tooltip md-direction="right">Année de naissance</md-tooltip>
                                        </md-input-container>
                                    </md-layout>
                                </md-layout>
                                <div class="search-block">
                                    <md-input-container v-validate="'required|country'">
                                        <label>Pays</label>
                                        <md-input type="search" name="country" @keyup.native="search" required></md-input>
                                        <md-icon>search</md-icon>
                                        <span class="md-error"></span>
                                    </md-input-container>
                                    <md-whiteframe v-if="options && options.length>0" class="autocomplete" md-elevation="3">
                                        <md-list>
                                            <md-list-item v-for="item,index in options" v-if="index<10"  @click="select(item)">
                                                {{item}}
                                            </md-list-item>
                                        </md-list>
                                    </md-whiteframe>
                                </div>
                                <div class="search-block">
                                    <md-input-container v-validate="'required|currency'">
                                        <label>Monnaie</label>
                                        <md-input type="search" name="currency" @keyup.native="searchCurrencies" required></md-input>
                                        <md-icon>search</md-icon>
                                        <span class="md-error"></span>
                                    </md-input-container>
                                    <md-whiteframe v-if="keys && keys.length>0" class="autocomplete" md-elevation="3">
                                        <md-list>
                                            <md-list-item v-for="key,index in keys" v-if="index<10"  @click="selectCurrency(key)">
                                                {{currencies[key].name}} <md-button @click="selectCurrency(key)">{{currencies[key].symbol}}</md-button>
                                            </md-list-item>
                                        </md-list>
                                    </md-whiteframe>
                                </div>
                                <md-input-container v-validate="'required|number'">
                                    <label>Numero</label>
                                    <md-input type="tel" name="number" required></md-input>
                                    <md-icon>phone</md-icon>
                                    <span class="md-error"></span>
                                    <md-tooltip md-direction="left">Le code de votre pays suivit de votre numero de telephone</md-tooltip>
                                </md-input-container>
                                <md-input-container md-has-password v-validate="'required|password'">
                                    <label>Mot de passe</label>
                                    <md-input minlength="8" type="password" name="password" required></md-input>
                                    <span class="md-error"></span>
                                </md-input-container>
                                <md-input-container md-has-password v-validate="'required|confirm'">
                                    <label>Mot de passe</label>
                                    <md-input minlength="8" type="password" name="confirm" required></md-input>
                                    <span class="md-error"></span>
                                </md-input-container>
                                <div>
                                    <md-radio name="sex" v-model="sex" md-value="H" class="md-primary" md-required>Homme</md-radio>
                                    <md-radio name="sex" v-model="sex" md-value="F" class="md-primary">Femme</md-radio>
                                </div>
                                <md-button type="submit" class="btn-submit">continuer</md-button>
                            </form>
                        </md-whiteframe>
                        <div class="step-btn">
                            <button type="button" @click="submit('inscrire')" class="md-button md-raised md-primary md-theme-default">continuer<div class="md-ink-ripple"><div class="md-ripple" style="width: 0px; height: 0px;"></div></div></button>
                        </div>
                    </md-step>
                    <md-step  :md-editable="false" md-button-continue="continuer" md-button-back=" ">
                        <p>Deuxième étape: Sélectionner votre emplacement géographique sur la carte</p>
                        <div id="map">
                            <iframe
                                    width="600"
                                    height="600"
                                    frameborder="0" style="border:0"
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAWquOlsQNH75OQg5PR6m2e71fnPFlyO7o
                                    &q=Space+Needle,Seattle+WA" allowfullscreen>
                            </iframe>
                        </div>
                        <div class="step-btn">
                            <button type="button" @click="next"  class="md-button md-raised md-primary md-theme-default">suivant<div class="md-ink-ripple"><div class="md-ripple" style="width: 0px; height: 0px;"></div></div></button>
                        </div>
                    </md-step>
                    <md-step md-button-continue="terminer" md-button-back=" ">
                        <p>Et enfin troisième étape. Choississez un moyen de confirmation de compte</p>
                        <div>
                            <md-radio v-model="confirmation" md-value="email" class="md-primary">Confirmation par email.</md-radio>
                            <md-radio v-model="confirmation" md-value="sms" class="md-primary">Confirmation par SMS.</md-radio>
                        </div>
                        <div class="step-btn">
                            <button type="button" @click="confirm" id="terminer" class="md-button md-raised md-primary md-theme-default">Terminer<div class="md-ink-ripple"><div class="md-ripple" style="width: 0px; height: 0px;"></div></div></button>
                        </div>
                    </md-step>
                </md-stepper>
            </md-layout>
        </md-layout>
        <md-dialog md-open-from="#terminer" md-close-to="#terminer"  ref="confirmation">
            <md-dialog-title>Confirmation</md-dialog-title>
            <md-dialog-content class="position-box">
                <form @submit.prevent="sendCode" class="sendCode">
                    <md-input-container class="none">
                        <md-input :value="csrfToken" name="_token" type="hidden"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>Code</label>
                        <md-input type="text" name="code" required></md-input>
                    </md-input-container>
                    <small>le code peut prendre plusieur minutes avant d'arriver</small><br>
                    <small>Je n'ai pas reçu de code de confirmation. <a>Renvoyer</a></small>
                    <md-button type="submit" class="none btn-submit"></md-button>
                </form>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="$refs['confirmation'].close()">Annuler</md-button>
                <md-button class="md-primary" @click="submit('sendCode')">Confirmer</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                mois: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                countries: ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"],
                options: null,
                keys: null,
                confirmation: null,
                currencies: {
                    "USD": {
                        "symbol": "$",
                        "name": "US Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "USD",
                        "name_plural": "US dollars"
                    },
                    "CAD": {
                        "symbol": "CA$",
                        "name": "Canadian Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "CAD",
                        "name_plural": "Canadian dollars"
                    },
                    "EUR": {
                        "symbol": "€",
                        "name": "Euro",
                        "symbol_native": "€",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "EUR",
                        "name_plural": "euros"
                    },
                    "AED": {
                        "symbol": "AED",
                        "name": "United Arab Emirates Dirham",
                        "symbol_native": "د.إ.‏",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "AED",
                        "name_plural": "UAE dirhams"
                    },
                    "AFN": {
                        "symbol": "Af",
                        "name": "Afghan Afghani",
                        "symbol_native": "؋",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "AFN",
                        "name_plural": "Afghan Afghanis"
                    },
                    "ALL": {
                        "symbol": "ALL",
                        "name": "Albanian Lek",
                        "symbol_native": "Lek",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "ALL",
                        "name_plural": "Albanian lekë"
                    },
                    "AMD": {
                        "symbol": "AMD",
                        "name": "Armenian Dram",
                        "symbol_native": "դր.",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "AMD",
                        "name_plural": "Armenian drams"
                    },
                    "ARS": {
                        "symbol": "AR$",
                        "name": "Argentine Peso",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "ARS",
                        "name_plural": "Argentine pesos"
                    },
                    "AUD": {
                        "symbol": "AU$",
                        "name": "Australian Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "AUD",
                        "name_plural": "Australian dollars"
                    },
                    "AZN": {
                        "symbol": "man.",
                        "name": "Azerbaijani Manat",
                        "symbol_native": "ман.",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "AZN",
                        "name_plural": "Azerbaijani manats"
                    },
                    "BAM": {
                        "symbol": "KM",
                        "name": "Bosnia-Herzegovina Convertible Mark",
                        "symbol_native": "KM",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "BAM",
                        "name_plural": "Bosnia-Herzegovina convertible marks"
                    },
                    "BDT": {
                        "symbol": "Tk",
                        "name": "Bangladeshi Taka",
                        "symbol_native": "৳",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "BDT",
                        "name_plural": "Bangladeshi takas"
                    },
                    "BGN": {
                        "symbol": "BGN",
                        "name": "Bulgarian Lev",
                        "symbol_native": "лв.",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "BGN",
                        "name_plural": "Bulgarian leva"
                    },
                    "BHD": {
                        "symbol": "BD",
                        "name": "Bahraini Dinar",
                        "symbol_native": "د.ب.‏",
                        "decimal_digits": 3,
                        "rounding": 0,
                        "code": "BHD",
                        "name_plural": "Bahraini dinars"
                    },
                    "BIF": {
                        "symbol": "FBu",
                        "name": "Burundian Franc",
                        "symbol_native": "FBu",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "BIF",
                        "name_plural": "Burundian francs"
                    },
                    "BND": {
                        "symbol": "BN$",
                        "name": "Brunei Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "BND",
                        "name_plural": "Brunei dollars"
                    },
                    "BOB": {
                        "symbol": "Bs",
                        "name": "Bolivian Boliviano",
                        "symbol_native": "Bs",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "BOB",
                        "name_plural": "Bolivian bolivianos"
                    },
                    "BRL": {
                        "symbol": "R$",
                        "name": "Brazilian Real",
                        "symbol_native": "R$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "BRL",
                        "name_plural": "Brazilian reals"
                    },
                    "BWP": {
                        "symbol": "BWP",
                        "name": "Botswanan Pula",
                        "symbol_native": "P",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "BWP",
                        "name_plural": "Botswanan pulas"
                    },
                    "BYR": {
                        "symbol": "BYR",
                        "name": "Belarusian Ruble",
                        "symbol_native": "BYR",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "BYR",
                        "name_plural": "Belarusian rubles"
                    },
                    "BZD": {
                        "symbol": "BZ$",
                        "name": "Belize Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "BZD",
                        "name_plural": "Belize dollars"
                    },
                    "CDF": {
                        "symbol": "CDF",
                        "name": "Congolese Franc",
                        "symbol_native": "FrCD",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "CDF",
                        "name_plural": "Congolese francs"
                    },
                    "CHF": {
                        "symbol": "CHF",
                        "name": "Swiss Franc",
                        "symbol_native": "CHF",
                        "decimal_digits": 2,
                        "rounding": 0.05,
                        "code": "CHF",
                        "name_plural": "Swiss francs"
                    },
                    "CLP": {
                        "symbol": "CL$",
                        "name": "Chilean Peso",
                        "symbol_native": "$",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "CLP",
                        "name_plural": "Chilean pesos"
                    },
                    "CNY": {
                        "symbol": "CN¥",
                        "name": "Chinese Yuan",
                        "symbol_native": "CN¥",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "CNY",
                        "name_plural": "Chinese yuan"
                    },
                    "COP": {
                        "symbol": "CO$",
                        "name": "Colombian Peso",
                        "symbol_native": "$",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "COP",
                        "name_plural": "Colombian pesos"
                    },
                    "CRC": {
                        "symbol": "₡",
                        "name": "Costa Rican Colón",
                        "symbol_native": "₡",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "CRC",
                        "name_plural": "Costa Rican colóns"
                    },
                    "CVE": {
                        "symbol": "CV$",
                        "name": "Cape Verdean Escudo",
                        "symbol_native": "CV$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "CVE",
                        "name_plural": "Cape Verdean escudos"
                    },
                    "CZK": {
                        "symbol": "Kč",
                        "name": "Czech Republic Koruna",
                        "symbol_native": "Kč",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "CZK",
                        "name_plural": "Czech Republic korunas"
                    },
                    "DJF": {
                        "symbol": "Fdj",
                        "name": "Djiboutian Franc",
                        "symbol_native": "Fdj",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "DJF",
                        "name_plural": "Djiboutian francs"
                    },
                    "DKK": {
                        "symbol": "Dkr",
                        "name": "Danish Krone",
                        "symbol_native": "kr",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "DKK",
                        "name_plural": "Danish kroner"
                    },
                    "DOP": {
                        "symbol": "RD$",
                        "name": "Dominican Peso",
                        "symbol_native": "RD$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "DOP",
                        "name_plural": "Dominican pesos"
                    },
                    "DZD": {
                        "symbol": "DA",
                        "name": "Algerian Dinar",
                        "symbol_native": "د.ج.‏",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "DZD",
                        "name_plural": "Algerian dinars"
                    },
                    "EEK": {
                        "symbol": "Ekr",
                        "name": "Estonian Kroon",
                        "symbol_native": "kr",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "EEK",
                        "name_plural": "Estonian kroons"
                    },
                    "EGP": {
                        "symbol": "EGP",
                        "name": "Egyptian Pound",
                        "symbol_native": "ج.م.‏",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "EGP",
                        "name_plural": "Egyptian pounds"
                    },
                    "ERN": {
                        "symbol": "Nfk",
                        "name": "Eritrean Nakfa",
                        "symbol_native": "Nfk",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "ERN",
                        "name_plural": "Eritrean nakfas"
                    },
                    "ETB": {
                        "symbol": "Br",
                        "name": "Ethiopian Birr",
                        "symbol_native": "Br",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "ETB",
                        "name_plural": "Ethiopian birrs"
                    },
                    "GBP": {
                        "symbol": "£",
                        "name": "British Pound Sterling",
                        "symbol_native": "£",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "GBP",
                        "name_plural": "British pounds sterling"
                    },
                    "GEL": {
                        "symbol": "GEL",
                        "name": "Georgian Lari",
                        "symbol_native": "GEL",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "GEL",
                        "name_plural": "Georgian laris"
                    },
                    "GHS": {
                        "symbol": "GH₵",
                        "name": "Ghanaian Cedi",
                        "symbol_native": "GH₵",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "GHS",
                        "name_plural": "Ghanaian cedis"
                    },
                    "GNF": {
                        "symbol": "FG",
                        "name": "Guinean Franc",
                        "symbol_native": "FG",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "GNF",
                        "name_plural": "Guinean francs"
                    },
                    "GTQ": {
                        "symbol": "GTQ",
                        "name": "Guatemalan Quetzal",
                        "symbol_native": "Q",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "GTQ",
                        "name_plural": "Guatemalan quetzals"
                    },
                    "HKD": {
                        "symbol": "HK$",
                        "name": "Hong Kong Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "HKD",
                        "name_plural": "Hong Kong dollars"
                    },
                    "HNL": {
                        "symbol": "HNL",
                        "name": "Honduran Lempira",
                        "symbol_native": "L",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "HNL",
                        "name_plural": "Honduran lempiras"
                    },
                    "HRK": {
                        "symbol": "kn",
                        "name": "Croatian Kuna",
                        "symbol_native": "kn",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "HRK",
                        "name_plural": "Croatian kunas"
                    },
                    "HUF": {
                        "symbol": "Ft",
                        "name": "Hungarian Forint",
                        "symbol_native": "Ft",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "HUF",
                        "name_plural": "Hungarian forints"
                    },
                    "IDR": {
                        "symbol": "Rp",
                        "name": "Indonesian Rupiah",
                        "symbol_native": "Rp",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "IDR",
                        "name_plural": "Indonesian rupiahs"
                    },
                    "ILS": {
                        "symbol": "₪",
                        "name": "Israeli New Sheqel",
                        "symbol_native": "₪",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "ILS",
                        "name_plural": "Israeli new sheqels"
                    },
                    "INR": {
                        "symbol": "Rs",
                        "name": "Indian Rupee",
                        "symbol_native": "টকা",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "INR",
                        "name_plural": "Indian rupees"
                    },
                    "IQD": {
                        "symbol": "IQD",
                        "name": "Iraqi Dinar",
                        "symbol_native": "د.ع.‏",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "IQD",
                        "name_plural": "Iraqi dinars"
                    },
                    "IRR": {
                        "symbol": "IRR",
                        "name": "Iranian Rial",
                        "symbol_native": "﷼",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "IRR",
                        "name_plural": "Iranian rials"
                    },
                    "ISK": {
                        "symbol": "Ikr",
                        "name": "Icelandic Króna",
                        "symbol_native": "kr",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "ISK",
                        "name_plural": "Icelandic krónur"
                    },
                    "JMD": {
                        "symbol": "J$",
                        "name": "Jamaican Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "JMD",
                        "name_plural": "Jamaican dollars"
                    },
                    "JOD": {
                        "symbol": "JD",
                        "name": "Jordanian Dinar",
                        "symbol_native": "د.أ.‏",
                        "decimal_digits": 3,
                        "rounding": 0,
                        "code": "JOD",
                        "name_plural": "Jordanian dinars"
                    },
                    "JPY": {
                        "symbol": "¥",
                        "name": "Japanese Yen",
                        "symbol_native": "￥",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "JPY",
                        "name_plural": "Japanese yen"
                    },
                    "KES": {
                        "symbol": "Ksh",
                        "name": "Kenyan Shilling",
                        "symbol_native": "Ksh",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "KES",
                        "name_plural": "Kenyan shillings"
                    },
                    "KHR": {
                        "symbol": "KHR",
                        "name": "Cambodian Riel",
                        "symbol_native": "៛",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "KHR",
                        "name_plural": "Cambodian riels"
                    },
                    "KMF": {
                        "symbol": "CF",
                        "name": "Comorian Franc",
                        "symbol_native": "FC",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "KMF",
                        "name_plural": "Comorian francs"
                    },
                    "KRW": {
                        "symbol": "₩",
                        "name": "South Korean Won",
                        "symbol_native": "₩",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "KRW",
                        "name_plural": "South Korean won"
                    },
                    "KWD": {
                        "symbol": "KD",
                        "name": "Kuwaiti Dinar",
                        "symbol_native": "د.ك.‏",
                        "decimal_digits": 3,
                        "rounding": 0,
                        "code": "KWD",
                        "name_plural": "Kuwaiti dinars"
                    },
                    "KZT": {
                        "symbol": "KZT",
                        "name": "Kazakhstani Tenge",
                        "symbol_native": "тңг.",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "KZT",
                        "name_plural": "Kazakhstani tenges"
                    },
                    "LBP": {
                        "symbol": "LB£",
                        "name": "Lebanese Pound",
                        "symbol_native": "ل.ل.‏",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "LBP",
                        "name_plural": "Lebanese pounds"
                    },
                    "LKR": {
                        "symbol": "SLRs",
                        "name": "Sri Lankan Rupee",
                        "symbol_native": "SL Re",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "LKR",
                        "name_plural": "Sri Lankan rupees"
                    },
                    "LTL": {
                        "symbol": "Lt",
                        "name": "Lithuanian Litas",
                        "symbol_native": "Lt",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "LTL",
                        "name_plural": "Lithuanian litai"
                    },
                    "LVL": {
                        "symbol": "Ls",
                        "name": "Latvian Lats",
                        "symbol_native": "Ls",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "LVL",
                        "name_plural": "Latvian lati"
                    },
                    "LYD": {
                        "symbol": "LD",
                        "name": "Libyan Dinar",
                        "symbol_native": "د.ل.‏",
                        "decimal_digits": 3,
                        "rounding": 0,
                        "code": "LYD",
                        "name_plural": "Libyan dinars"
                    },
                    "MAD": {
                        "symbol": "MAD",
                        "name": "Moroccan Dirham",
                        "symbol_native": "د.م.‏",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "MAD",
                        "name_plural": "Moroccan dirhams"
                    },
                    "MDL": {
                        "symbol": "MDL",
                        "name": "Moldovan Leu",
                        "symbol_native": "MDL",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "MDL",
                        "name_plural": "Moldovan lei"
                    },
                    "MGA": {
                        "symbol": "MGA",
                        "name": "Malagasy Ariary",
                        "symbol_native": "MGA",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "MGA",
                        "name_plural": "Malagasy Ariaries"
                    },
                    "MKD": {
                        "symbol": "MKD",
                        "name": "Macedonian Denar",
                        "symbol_native": "MKD",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "MKD",
                        "name_plural": "Macedonian denari"
                    },
                    "MMK": {
                        "symbol": "MMK",
                        "name": "Myanma Kyat",
                        "symbol_native": "K",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "MMK",
                        "name_plural": "Myanma kyats"
                    },
                    "MOP": {
                        "symbol": "MOP$",
                        "name": "Macanese Pataca",
                        "symbol_native": "MOP$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "MOP",
                        "name_plural": "Macanese patacas"
                    },
                    "MUR": {
                        "symbol": "MURs",
                        "name": "Mauritian Rupee",
                        "symbol_native": "MURs",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "MUR",
                        "name_plural": "Mauritian rupees"
                    },
                    "MXN": {
                        "symbol": "MX$",
                        "name": "Mexican Peso",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "MXN",
                        "name_plural": "Mexican pesos"
                    },
                    "MYR": {
                        "symbol": "RM",
                        "name": "Malaysian Ringgit",
                        "symbol_native": "RM",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "MYR",
                        "name_plural": "Malaysian ringgits"
                    },
                    "MZN": {
                        "symbol": "MTn",
                        "name": "Mozambican Metical",
                        "symbol_native": "MTn",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "MZN",
                        "name_plural": "Mozambican meticals"
                    },
                    "NAD": {
                        "symbol": "N$",
                        "name": "Namibian Dollar",
                        "symbol_native": "N$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "NAD",
                        "name_plural": "Namibian dollars"
                    },
                    "NGN": {
                        "symbol": "₦",
                        "name": "Nigerian Naira",
                        "symbol_native": "₦",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "NGN",
                        "name_plural": "Nigerian nairas"
                    },
                    "NIO": {
                        "symbol": "C$",
                        "name": "Nicaraguan Córdoba",
                        "symbol_native": "C$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "NIO",
                        "name_plural": "Nicaraguan córdobas"
                    },
                    "NOK": {
                        "symbol": "Nkr",
                        "name": "Norwegian Krone",
                        "symbol_native": "kr",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "NOK",
                        "name_plural": "Norwegian kroner"
                    },
                    "NPR": {
                        "symbol": "NPRs",
                        "name": "Nepalese Rupee",
                        "symbol_native": "नेरू",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "NPR",
                        "name_plural": "Nepalese rupees"
                    },
                    "NZD": {
                        "symbol": "NZ$",
                        "name": "New Zealand Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "NZD",
                        "name_plural": "New Zealand dollars"
                    },
                    "OMR": {
                        "symbol": "OMR",
                        "name": "Omani Rial",
                        "symbol_native": "ر.ع.‏",
                        "decimal_digits": 3,
                        "rounding": 0,
                        "code": "OMR",
                        "name_plural": "Omani rials"
                    },
                    "PAB": {
                        "symbol": "B/.",
                        "name": "Panamanian Balboa",
                        "symbol_native": "B/.",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "PAB",
                        "name_plural": "Panamanian balboas"
                    },
                    "PEN": {
                        "symbol": "S/.",
                        "name": "Peruvian Nuevo Sol",
                        "symbol_native": "S/.",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "PEN",
                        "name_plural": "Peruvian nuevos soles"
                    },
                    "PHP": {
                        "symbol": "₱",
                        "name": "Philippine Peso",
                        "symbol_native": "₱",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "PHP",
                        "name_plural": "Philippine pesos"
                    },
                    "PKR": {
                        "symbol": "PKRs",
                        "name": "Pakistani Rupee",
                        "symbol_native": "₨",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "PKR",
                        "name_plural": "Pakistani rupees"
                    },
                    "PLN": {
                        "symbol": "zł",
                        "name": "Polish Zloty",
                        "symbol_native": "zł",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "PLN",
                        "name_plural": "Polish zlotys"
                    },
                    "PYG": {
                        "symbol": "₲",
                        "name": "Paraguayan Guarani",
                        "symbol_native": "₲",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "PYG",
                        "name_plural": "Paraguayan guaranis"
                    },
                    "QAR": {
                        "symbol": "QR",
                        "name": "Qatari Rial",
                        "symbol_native": "ر.ق.‏",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "QAR",
                        "name_plural": "Qatari rials"
                    },
                    "RON": {
                        "symbol": "RON",
                        "name": "Romanian Leu",
                        "symbol_native": "RON",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "RON",
                        "name_plural": "Romanian lei"
                    },
                    "RSD": {
                        "symbol": "din.",
                        "name": "Serbian Dinar",
                        "symbol_native": "дин.",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "RSD",
                        "name_plural": "Serbian dinars"
                    },
                    "RUB": {
                        "symbol": "RUB",
                        "name": "Russian Ruble",
                        "symbol_native": "руб.",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "RUB",
                        "name_plural": "Russian rubles"
                    },
                    "RWF": {
                        "symbol": "RWF",
                        "name": "Rwandan Franc",
                        "symbol_native": "FR",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "RWF",
                        "name_plural": "Rwandan francs"
                    },
                    "SAR": {
                        "symbol": "SR",
                        "name": "Saudi Riyal",
                        "symbol_native": "ر.س.‏",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "SAR",
                        "name_plural": "Saudi riyals"
                    },
                    "SDG": {
                        "symbol": "SDG",
                        "name": "Sudanese Pound",
                        "symbol_native": "SDG",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "SDG",
                        "name_plural": "Sudanese pounds"
                    },
                    "SEK": {
                        "symbol": "Skr",
                        "name": "Swedish Krona",
                        "symbol_native": "kr",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "SEK",
                        "name_plural": "Swedish kronor"
                    },
                    "SGD": {
                        "symbol": "S$",
                        "name": "Singapore Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "SGD",
                        "name_plural": "Singapore dollars"
                    },
                    "SOS": {
                        "symbol": "Ssh",
                        "name": "Somali Shilling",
                        "symbol_native": "Ssh",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "SOS",
                        "name_plural": "Somali shillings"
                    },
                    "SYP": {
                        "symbol": "SY£",
                        "name": "Syrian Pound",
                        "symbol_native": "ل.س.‏",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "SYP",
                        "name_plural": "Syrian pounds"
                    },
                    "THB": {
                        "symbol": "฿",
                        "name": "Thai Baht",
                        "symbol_native": "฿",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "THB",
                        "name_plural": "Thai baht"
                    },
                    "TND": {
                        "symbol": "DT",
                        "name": "Tunisian Dinar",
                        "symbol_native": "د.ت.‏",
                        "decimal_digits": 3,
                        "rounding": 0,
                        "code": "TND",
                        "name_plural": "Tunisian dinars"
                    },
                    "TOP": {
                        "symbol": "T$",
                        "name": "Tongan Paʻanga",
                        "symbol_native": "T$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "TOP",
                        "name_plural": "Tongan paʻanga"
                    },
                    "TRY": {
                        "symbol": "TL",
                        "name": "Turkish Lira",
                        "symbol_native": "TL",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "TRY",
                        "name_plural": "Turkish Lira"
                    },
                    "TTD": {
                        "symbol": "TT$",
                        "name": "Trinidad and Tobago Dollar",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "TTD",
                        "name_plural": "Trinidad and Tobago dollars"
                    },
                    "TWD": {
                        "symbol": "NT$",
                        "name": "New Taiwan Dollar",
                        "symbol_native": "NT$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "TWD",
                        "name_plural": "New Taiwan dollars"
                    },
                    "TZS": {
                        "symbol": "TSh",
                        "name": "Tanzanian Shilling",
                        "symbol_native": "TSh",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "TZS",
                        "name_plural": "Tanzanian shillings"
                    },
                    "UAH": {
                        "symbol": "₴",
                        "name": "Ukrainian Hryvnia",
                        "symbol_native": "₴",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "UAH",
                        "name_plural": "Ukrainian hryvnias"
                    },
                    "UGX": {
                        "symbol": "USh",
                        "name": "Ugandan Shilling",
                        "symbol_native": "USh",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "UGX",
                        "name_plural": "Ugandan shillings"
                    },
                    "UYU": {
                        "symbol": "$U",
                        "name": "Uruguayan Peso",
                        "symbol_native": "$",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "UYU",
                        "name_plural": "Uruguayan pesos"
                    },
                    "UZS": {
                        "symbol": "UZS",
                        "name": "Uzbekistan Som",
                        "symbol_native": "UZS",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "UZS",
                        "name_plural": "Uzbekistan som"
                    },
                    "VEF": {
                        "symbol": "Bs.F.",
                        "name": "Venezuelan Bolívar",
                        "symbol_native": "Bs.F.",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "VEF",
                        "name_plural": "Venezuelan bolívars"
                    },
                    "VND": {
                        "symbol": "₫",
                        "name": "Vietnamese Dong",
                        "symbol_native": "₫",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "VND",
                        "name_plural": "Vietnamese dong"
                    },
                    "XAF": {
                        "symbol": "FCFA",
                        "name": "CFA Franc BEAC",
                        "symbol_native": "FCFA",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "XAF",
                        "name_plural": "CFA francs BEAC"
                    },
                    "XOF": {
                        "symbol": "CFA",
                        "name": "CFA Franc BCEAO",
                        "symbol_native": "CFA",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "XOF",
                        "name_plural": "CFA francs BCEAO"
                    },
                    "YER": {
                        "symbol": "YR",
                        "name": "Yemeni Rial",
                        "symbol_native": "ر.ي.‏",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "YER",
                        "name_plural": "Yemeni rials"
                    },
                    "ZAR": {
                        "symbol": "R",
                        "name": "South African Rand",
                        "symbol_native": "R",
                        "decimal_digits": 2,
                        "rounding": 0,
                        "code": "ZAR",
                        "name_plural": "South African rand"
                    },
                    "ZMK": {
                        "symbol": "ZK",
                        "name": "Zambian Kwacha",
                        "symbol_native": "ZK",
                        "decimal_digits": 0,
                        "rounding": 0,
                        "code": "ZMK",
                        "name_plural": "Zambian kwachas"
                    }
                },
                sex: null,
                user: null,
                csrfToken: window.Laravel.csrfToken,
            }
        },
        methods: {
            close(){
                this.options = null
                this.keys = null
            },
            searchCurrencies(event){
                if(event.target.value.length>0){
                    let regexp = this.buildRegex(event)
                    this.keys = Object.keys(this.currencies).filter((k)=>{
                        return this.currencies[k].name.match(new RegExp(regexp,'i'))
                    })
                }
            },
            search(event){
                if(event.target.value.length>0){
                    let regexp = this.buildRegex(event)
                    this.options = this.countries.filter((nom)=>{
                        return nom.match(new RegExp(regexp,'i'))
                    })
                }
            },
            buildRegex (event){
                let val = event.target.value
                let regexp = '\\b(.*)';
                for(let i in val){
                    if(val[i] !== ' '){
                        regexp += '('+val[i]+')(.*)'
                    }
                }
               return regexp += '\\b'
            },
            select (nom){
                this.$el.querySelector('input[name=country]').value = nom
                this.$el.querySelector('input[name=country]').focus()
            },
            selectCurrency (key){
                this.$el.querySelector('input[name=currency]').value = this.currencies[key].symbol
                this.$el.querySelector('input[name=currency]').focus()
            },
            submit (classe){
                this.$el.querySelector('.'+classe+' .btn-submit').click()
            },
            next (){
                this.$el.querySelector('.md-step-actions button').click()
            },
            store (formdata){
                console.log(formdata)
                let date = formdata.get('jour')+" "+formdata.get('mois')+", "+formdata.get('annee')
                formdata.append('birthday',date)
                formdata.delete('jour')
                formdata.delete('mois')
                formdata.delete('annee')
                console.log(date,formdata)
                this.$user.save(null, formdata).then( response => {
                    response.json().then(data=>{
                        this.user = data
                        this.$el.querySelector('.md-step-actions button').click()
                        window.scrollTo(null,0)
                    })
                }, response => {
                    response.json().then(data=>{
                        if(response.status === 422){
                            let firstEl
                            Object.keys(data).map((k,i)=>{
                                let el = this.parentNode(this.$el.querySelector('input[name='+k+']'),'md-input-container')
                                let fieldName = (el.querySelector('label')) ? el.querySelector('label').innerText : k
                                if(i === 0) firstEl = el
                                el.classList.add('md-input-invalid')
                                let mot = data[k].split(" ")[1]
                                el.querySelector('.md-error').innerText =  data[k].replace(mot, fieldName.toLowerCase())
                            })
                            firstEl.scrollIntoViewIfNeeded()
                        }
                    })
                })
            },
            confirm (){
                if(this.confirmation === "email"){
                    this.$user.query({path:"confirmer/email"}).then(response=>{
                        response.json().then(data=>{

                        })
                    })
                }else if(this.confirmation === "sms"){
                    this.$user.query({path:"confirmer/sms"}).then(response=>{
                        response.json().then(data=>{
                            this.$refs['confirmation'].open()
                        })
                    })
                }
            }
        },
        mounted(){
            this.$user = this.$resource('/user{/path}')
            this.$el.querySelectorAll('input[type=radio]').forEach((el)=>{el.setAttribute('required','required')})
        },
        watch: {
            sex(value){
                this.$el.querySelector('input[name=sex]').checked = true
            }
        }
    }
</script>

<style>
    form{
        padding:15px;
    }

    .grille{
        justify-content: space-around;
    }
    .date{
        justify-content: space-between;
    }
    .step-btn button{
        margin-left: 0;
    }
    .date .md-input-container{
        width: 50vh;
    }
    form .btn-submit{
        display: none;
    }
    .md-step-actions{
        display: none;
    }
    .autocomplete{
        position: absolute;
        width: 80%;
    }
    .position-box {
        overflow: hidden;
    }
    a{
        cursor: pointer;
    }
</style>