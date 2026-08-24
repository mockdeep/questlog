const FIELDS = [
  {check: "isBlank", name: "estimateSeconds"},
  {check: "isEmpty", name: "tagIds"},
];

function flag(present: boolean, text: string): string {
  if (!present) { return ""; }

  return text;
}

function fieldSelect(selected: string): string {
  const options = FIELDS.map(({name}) => {
    const chosen = flag(name === selected, " selected");

    return `<option value="${name}"${chosen}>${name}</option>`;
  }).join("");
  const target = "data-tag-rule-target=\"field\"";
  const action = "data-action=\"change->tag-rule#fieldChanged\"";

  return `<select name="tag[rules][][field]" ${target} ${action}>` +
    `${options}</select>`;
}

/*
 * Mirrors the server-rendered row: one check dropdown per field, with every
 * dropdown but the selected field's disabled so it is not submitted.
 */
function checkSelects(selected: string): string {
  return FIELDS.map(({check, name}) => {
    const flags = flag(name !== selected, " disabled hidden");
    const option = `<option value="${check}" selected>${check}</option>`;
    const target = "data-tag-rule-target=\"check\"";

    return `<select name="tag[rules][][check]" ${target} ` +
      `data-check-field="${name}"${flags}>${option}</select>`;
  }).join("");
}

function ruleRow(field: string): string {
  const action = "data-action=\"click->tag-rule#remove\"";
  const icon = `<i class="fas fa-times" ${action}></i>`;
  const selects = `${fieldSelect(field)}${checkSelects(field)}`;
  const data = "data-controller=\"tag-rule\" data-tag-rules-target=\"rule\"";

  return `<li ${data}>${selects}${icon}</li>`;
}

export {ruleRow};
