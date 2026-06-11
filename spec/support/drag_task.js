const [type, element] = arguments;
const rect = element.getBoundingClientRect();
element.dispatchEvent(new DragEvent(type, {
  bubbles: true,
  cancelable: true,
  dataTransfer: new DataTransfer(),
  clientX: rect.x + (rect.width / 2),
  clientY: rect.y + 2,
}));
