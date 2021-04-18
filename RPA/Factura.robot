*** Settings ***
Library    DateTime
Library    Collections
Library    RPA.Tables
Library    RPA.FileSystem
Library    RPA.JSON
Library    RPA.Cloud.AWS
Library    RPA.HTTP


*** Variables ***
${file_path} =  /home/UA/2/ArquitecturasNuevaGeneracion/Robot/NGArchitecture/RPA/factura.csv
# -------------------------- WEBSERVICE --------------------------
${URL_WS} =  https://rkbxeoc25h.execute-api.us-east-2.amazonaws.com
${PATH_WS} =  /prod/invoice
${request} =    { "operation" : "getInvoiceData" }
# -------------------------- AWS --------------------------
${AWS_KEY}=    SPp6bUylsk25LgnxM5BuMGKg/UwFoRwVYWjdjMmL
${AWS_KEY_ID}=   AKIA4VCQAFVF26RJ5IPY
${BUCKET_NAME}=   invoiceservices

*** Tasks ***
Files to Table

    # -------------------------- CONSUME WEBSERVICE --------------------------
    Create Session    httpbin    ${URL_WS}
    ${resp}=    Post Request    httpbin    ${PATH_WS}    data=${request}
    ${facturacion}=    Set Variable    ${resp.json()}

    # -------------------------- GENERATE INVOICE --------------------------
    ${date}=    Get Current Date
    # PATIENT DATA IN JSON
    ${name}=     Get value from JSON     ${facturacion}   $.patientData.name
    ${lastName}=     Get value from JSON     ${facturacion}   $.patientData.lastName
    ${document}=     Get value from JSON     ${facturacion}   $.patientData.document
    ${type}=     Get value from JSON     ${facturacion}   $.patientData.type
    ${address}=     Get value from JSON     ${facturacion}   $.patientData.address
    # DATA IS NOT IN JSON
    ${N} =    Create List    NIT    Razon Social    Fecha    Factura de Cobro    -------INFORMACION-    Nombre    Apellido    Documento    Tipo Documento    Direccion    -------TRATAMIENTO-
    ${V} =    Create List    12345678    ClincaABC    ${date}    ${type}${document}    -PERSONAL-------    ${name}    ${lastName}    ${document}    ${type}    ${address}    -COSTO-------
    ${C} =    Create List    .....    .....    .....    .....    .....    .....    .....    .....    .....    .....    .....
    
    # COST DATA IN JSON
    ${proceduresIds}=     Get values from JSON    ${facturacion}    $.proceduresData.procedures[*].procedureId
    ${costsIds}=     Get values from JSON    ${facturacion}    $.costData.procedures[*].id
    ${iterator}=    Set Variable    0
    ${totalCost}=    Set Variable    0
    FOR    ${id}    IN    @{proceduresIds}
        ${costIndex} =    Evaluate    ${costsIds}.index(${id})
        ${procedure}=     Get value from JSON     ${facturacion}   $.costData.procedures[${costIndex}].procedure
        ${cost}=     Get value from JSON     ${facturacion}   $.costData.procedures[${costIndex}].value
        ${quantity}     Get value from JSON     ${facturacion}   $.proceduresData.procedures[${iterator}].quantity
        # ADD DATA TO LISTS N, V AND C.
        ${Dict}=    Create Dictionary    Nombre    ${procedure}    Valor    ${cost}
        Append to List    ${N}    ${procedure}
        Append to List    ${V}    ${cost}
        Append to List    ${C}    ..${quantity}..
        # TOTAL COST
        ${totalCost}=    Evaluate    ${totalCost} + (${cost} * ${quantity})
        ${iterator}=    Evaluate    ${iterator} + 1
    END
    # APPEND TO LIST LAST ROWS
    Append to List    ${N}    -------------------    -COSTO--TOTAL-
    Append to List    ${V}    -------------------    ${totalCost}
    Append to List    ${C}    .....    .....
    # CREATE TABLE
    ${InvoiceList} =    Create Dictionary    NOMBRES    ${N}    CANTIDAD    ${C}    VALORES    ${V}
    ${INVOICE}=    Create table    ${InvoiceList}
    # CREATE CSV FILE
    Write table to CSV    ${INVOICE}    ${file_path}
    
    # -------------------------- UPLOAD FILE TO CSV --------------------------
    Init S3 Client    aws_key_id=${AWS_KEY_ID}    aws_key=${AWS_KEY}
    Upload File    ${BUCKET_NAME}    ${file_path}    Invoices${/}factura${type}${document}.csv

# Debe llevar NIT, razón social, fecha de expedición de la factura, 
# detalle, base gravable, detalle de impuestos
# y la referencia o numeración de la factura
# ah y expresar que es una factura
# Porque puede ser un recibo de caja menor, o una nota crédito o en fin, debe especificar el doc
# yyy por último especificar el régimen