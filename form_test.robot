*** Settings ***
Library           SeleniumLibrary
Suite Setup       Open Browser    ${url}    Chrome
Suite Teardown    Close All Browsers

*** Variable ***
${url}    https://localhost:3000
${locator_text}      xpath://*[@data-test='text-input']
${locator_checkbox}  xpath://*[@data-test='check-box']
${locator_radio}    xpath://*[@data-test='radio-option3']
${locator_select_parent}  xpath://*[@data-test='select']
${locator_select_option}  xpath://*[@data-test='select-option-3']
${locator_button}    xpath://*[@data-test='submit']

*** Keywords ***
Login Manage Google Sites
    Wait Until Page Contains    login
    Input Text    xpath://input[@id='Email']    ${GOO_LOGIN}
    Click Button    xpath://input[@id='next']
    Wait Until Element Is Visible    xpath://*[@id="email-display"]
    Element Text Should Be    xpath://*[@id="email-display"]    ${GOO_LOGIN}
    Input Text    xpath://input[@id='Passwd']    ${GOO_PASS}
    Click Button    xpath://input[@id='signIn']
    Wait Until Element Is Not Visible    xpath://input[@id='signIn']

*** Test Case ***
Material Input Template Test
    Login Manage Google Sites
    Input Text    ${locator_text}    Able to input text on field

Material Checkbox Template Test
    Click Element    ${locator_checkbox}

Material Radio Template Test
    Click Element    ${locator_radio}

Material Select Template Test
    Click Element    ${locator_select_parent}
    Click Element    ${locator_select_option}
    Wait Until Element Is Not Visible    ${locator_select_option}

Material Button Template Test
    Click Element    ${locator_button}
