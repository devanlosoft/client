<template>
  <div
    v-if="element"
    style="width: 100%"
    v-bind="props"
    class="btn-editor-container"
    @mouseenter="onShowProperties"
    @mouseleave="isVisiblePanelButtons = false"
  >
    <v-hover v-slot="{ isHovering, props }" open-delay="10">
      <component
        :is="dynamicRenderElement(element.type)"
        :element="element"
        :class="{ 'on-hover': isHovering }"
        :elevation="isHovering && isVisiblePanelButtons ? 12 : 0"
        v-bind="props"
      />
    </v-hover>
    <PanelEditor
      v-if="isVisiblePanelButtons"
      :element="element"
      :parent="parent"
    />
  </div>
</template>
<script setup>
import {
  ElementsETPage,
  ElementsETParagraph,
  ElementsETDefault,
  ElementsETSelect,
  ElementsETInputTextField,
  ElementsETCard,
  ElementsETChip,
  ElementsETButton,
  ElementsETCheckbox,
  ElementsETDivider,
  ElementsETExpande,
  ElementsETIcons,
  ElementsETLists,
  ElementsETSwitch,
  ElementsETTable,
  ElementsETTooltip,
  ElementsETTextarea,
  ElementsETTemplate,
  ElementsETInputFileSimple,
  ElementsETTitle,
  ElementsETButtonSheets,
} from "#components";
import { usePropertiePanelStore } from "~/store/propertiePanel";

const propertiePanelStore = usePropertiePanelStore();
const isVisiblePanelButtons = ref(false);

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  parent: {
    type: Object,
    default: null,
  },
});

const onShowProperties = () => {
  propertiePanelStore.setElementTemp(props.element);
  isVisiblePanelButtons.value = true;
};

// se vincula el nuevo elemento
const dynamicRenderElement = (type) =>
  ({
    page: ElementsETPage,
    card: ElementsETCard,
    paragraph: ElementsETParagraph,
    default: ElementsETDefault,
    select: ElementsETSelect,
    inputtextfield: ElementsETInputTextField,
    chip: ElementsETChip,
    button: ElementsETButton,
    checkbox: ElementsETCheckbox,
    divider: ElementsETDivider,
    expande: ElementsETExpande,
    icon: ElementsETIcons,
    list: ElementsETLists,
    switch: ElementsETSwitch,
    table: ElementsETTable,
    tooltip: ElementsETTooltip,
    textarea: ElementsETTextarea,
    template: ElementsETTemplate,
    inputfilesimple: ElementsETInputFileSimple,
    title: ElementsETTitle,
    buttonSheets: ElementsETButtonSheets,
  }[type]);
</script>

<style>
.btn-editor-container {
  position: relative;
}

.btn-editor-container:hover {
  background-color: rgb(255, 255, 194, 0.1);
}
</style>
