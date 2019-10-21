*** Settings ***
Library           SeleniumLibrary
Suite Setup       Open Browser    ${url}    Chrome
Suite Teardown    Close All Browser

*** Variable ***
${url}    http://localhost:3000
${locator_text}    xpath://*[@data-test='xpot']
${locator_checkbox}    
${locator_radio}    
${locator_select_parent}    
${locator_select_option}    
${locator_button}    

*** Test Case ***
Material Input Template Test
    Input Text    ${locator_text}    Able to input text on field

Material Checkbox Template Test
    Click Element    ${locator_checkbox}

Material Radio Template Test
    Click Element    ${locator_radio}

Material Select Template Test
    Click Element    ${locator_select_parent}
    Click Element    ${locator_select_option}

Material Button Template Test
    Click Element    ${locator_button}
