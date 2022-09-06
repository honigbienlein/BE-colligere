SELECT
    "Collection"."id_collection",
    "Collection"."id_user",
    "Collection"."name_collection",
    "Entries"."id_entry" AS "Entries.id_entry",
    "Entries"."id_collection" AS "Entries.id_collection",
    "Entries->AttributeValues"."id_attributeValue" AS "Entries.AttributeValues.id_attributeValue",
    "Entries->AttributeValues"."id_attribute" AS "Entries.AttributeValues.id_attribute",
    "Entries->AttributeValues"."attributeValue" AS "Entries.AttributeValues.attributeValue",
    "Entries->AttributeValues->Attributes"."id_attribute" AS "Entries.AttributeValues.Attributes.id_attribute",
    "Entries->AttributeValues->Attributes"."name_attribute" AS "Entries.AttributeValues.Attributes.name_attribute"
FROM "Collections" AS "Collection"
LEFT OUTER JOIN "Entries" AS "Entries" ON "Collection"."id_collection" = "Entries"."id_collection"
LEFT OUTER JOIN "AttributeValues" AS "Entries->AttributeValues" ON "Entries"."id_entry" = "Entries->AttributeValues"."id_entry"
LEFT OUTER JOIN "Attributes" AS "Entries->AttributeValues->Attributes" ON "Entries->AttributeValues"."id_attributeValue" = "Entries->AttributeValues->Attributes"."id_attribute"
WHERE "Collection"."id_collection" = 2;