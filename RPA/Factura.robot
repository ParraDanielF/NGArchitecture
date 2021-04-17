*** Settings ***
Library    RPA.Tables
Library    RPA.FileSystem
Library    RPA.JSON
Library    DateTime
Library    Collections

*** Variables ***
${file_path} =  /home/UA/2/ArquitecturasNuevaGeneracion/Robot/NGArchitecture/RPA/factura.csv
${json} =   {"patientData":{"module":"patient","version":"1.0.0","name":"John","lastName":"Doe","document":123123,"type":"passport","address":"Av 12 # 12 -12"},"proceduresData":{"module":"clinicHistory","version":"1.0.0","procedures":[{"id":123,"date":"12/12/2012","procedureId":45,"medicalHeadquarterId":2,"professionalId":1522,"quantity":2},{"id":124,"date":"13/12/2012","procedureId":23,"medicalHeadquarterId":2,"professionalId":1488,"quantity":1}]},"costData":{"module":"management","version":"1.0.0","procedures":[{"id":45,"procedure":"Radiografía de torax","value":12500},{"id":23,"procedure":"Operación de costilla","value":43500},{"id":30,"procedure":"Hospitalización en cama x noche","value":11500}]}}

*** Tasks ***
Files to Table
    ${date}=    Get Current Date
    ${facturacion}=    Convert string to JSON   ${json}

    # DATA IS NOT IN JSON
    ${R}=    Create Dictionary    Nombre    NIT    Valor    12345678
    ${R1}=    Create Dictionary    Nombre    Razon Social    Valor    ClincaABC
    ${R2}=    Create Dictionary    Nombre    Fecha    Valor    ${date}
    ${R3}=    Create Dictionary    Nombre    Factura de Cobro    Valor    ${1001}
    # PATIENT DATA IN JSON
    ${name}=     Get value from JSON     ${facturacion}   $.patientData.name
    ${lastName}=     Get value from JSON     ${facturacion}   $.patientData.lastName
    ${document}=     Get value from JSON     ${facturacion}   $.patientData.document
    ${type}=     Get value from JSON     ${facturacion}   $.patientData.type
    ${address}=     Get value from JSON     ${facturacion}   $.patientData.address
    # PATIENT DATA DICTIONARIES.
    ${R4}=    Create Dictionary    Nombre    -------INFORMACION-    Valor    -PERSONAL-------
    ${R5}=    Create Dictionary    Nombre    Nombre    Valor    ${name}
    ${R6}=    Create Dictionary    Nombre    Apellido    Valor    ${lastName}
    ${R7}=    Create Dictionary    Nombre    Documento    Valor    ${document}
    ${R8}=    Create Dictionary    Nombre    Tipo de Documento    Valor    ${type}
    ${R9}=    Create Dictionary    Nombre    Direccion    Valor    ${address}
    # COST DATA IN JSON
    ${R10}=    Create Dictionary    Nombre    -------TRATAMIENTO-    Valor    -COSTO-------
    ${InvoiceList}=    Create List    ${R}    ${R1}    ${R2}    ${R3}    ${R4}    ${R5}    ${R6}    ${R7}    ${R8}    ${R9}    ${R10}
    ${ids}=     Get values from JSON     ${facturacion}   $.costData.procedures[*].id
    ${iterator}=    Set Variable    0
    FOR    ${id}    IN    @{ids}
        ${procedure}=     Get value from JSON     ${facturacion}   $.costData.procedures[${iterator}].procedure
        ${cost}=     Get value from JSON     ${facturacion}   $.costData.procedures[${iterator}].value
        # COST DATA DICTIONARIES.
        ${Dict}=    Create Dictionary    Nombre    ${procedure}    Valor    ${cost}
        Append to List    ${InvoiceList}    ${Dict}
        ${iterator}=    Evaluate    ${iterator} + 1
    END
    ${R11}=    Create Dictionary    Nombre    -------------------    Valor    -------------------
    # TOTAL COST
    ${cost}=     Get values from JSON     ${facturacion}   $.costData.procedures[*].value
    ${totalCost}=    Set Variable    0
    FOR    ${c}    IN    @{cost}
        ${totalCost}=    Evaluate    ${c} + ${totalCost}
    END
    ${R12}=    Create Dictionary    Nombre    -COSTO--TOTAL-    Valor    ${totalCost}
    # APPEND TO LIST LAST ROWS
    Append to List    ${InvoiceList}    ${R11}    ${R12}
    # CREATE TABLE
    ${INVOICE}=    Create table    ${InvoiceList}
    # CREATE CSV FILE
    Write table to CSV    ${INVOICE}    ${file_path}


# Debe llevar NIT, razón social, fecha de expedición de la factura, 
# detalle, base gravable, detalle de impuestos
# y la referencia o numeración de la factura
# ah y expresar que es una factura
# Porque puede ser un recibo de caja menor, o una nota crédito o en fin, debe especificar el doc
# yyy por último especificar el régimen