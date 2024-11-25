<template>
  <v-card
    v-bind="element.properties"
    :class="combinedClasses"
    :text="resolveCommand(element.properties.text)"
  >
    <v-card-actions v-if="element.properties.actions">
      <v-btn @click="element.properties.actions_function">
        {{ element.properties.actions_label }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});

const expr = /^_.+/;
const regex = new RegExp(expr);

const combinedClasses = computed(() => {
  const classes = Array.isArray(props.element.properties.class)
    ? props.element.properties.class
    : [];
  return classes.join(" ");
});

const resolveCommand = (text) => {
  const match = regex.test(text);
  if (match) {
    switch (text) {
      case "_lorem":
        return `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
      default:
        return text;
    }
  } else {
    return text;
  }
};

const text = ref(resolveCommand(props.element.properties.text));
</script>

<style scoped></style>

<!--template>
  <v-card v-bind="filteredProps">
    <v-card-actions v-if="element.properties.actions">
      <v-btn @click="element.properties.actions_function">
        {{ element.properties.actions_label }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});

const expr = /^_.+/;
const regex = new RegExp(expr);

const combinedClasses = computed(() => {
  const classes = Array.isArray(props.element.properties.class)
    ? props.element.properties.class
    : [];
  return classes.join(" ");
});

const resolveCommand = (text) => {
  const match = regex.test(text);
  if (match) {
    switch (text) {
      case "_lorem":
        return `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
      default:
        return text;
    }
  } else {
    return text;
  }
};

const text = ref(resolveCommand(props.element.properties.text));

const filteredProps = computed(() => {
  const {
    isAvatar,
    isIcon,
    append_icon,
    prepend_icon,
    append_avatar,
    prepend_avatar,
    actions,
    actions_function,
    actions_label,
    class: classes,
    text: txt,
    ...otherProps
  } = props.element.properties;

  let dynamicProps = {};
  if (isAvatar) {
    dynamicProps = {
      appendAvatar: append_avatar,
      prependAvatar: prepend_avatar,
    };
  } else if (isIcon) {
    dynamicProps = {
      appendIcon: append_icon,
      prependIcon: prepend_icon,
    };
  }

  const filteredOtherProps = Object.entries(otherProps).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  return {
    ...filteredOtherProps,
    ...dynamicProps,
    class: combinedClasses.value,
    text: text.value,
  };
});
</script>

<style scoped></style-->
