import "../styles/scss/pandan.scss";
import styled, { css } from "styled-components";

function r(pxValue) {
  const ratio = 20; // Set according to the project configuration ratio

  // for template literals
  if (Array.isArray(pxValue)) {
    pxValue = pxValue[0];
  }

  pxValue = parseInt(pxValue);

  return pxValue / ratio + "rem";
}

function transformPxToRem(style) {
  // Avoid dealing with situations such as functions
  if (typeof style !== "string") {
    return style;
  }

  return style.replace(/\d+px/gm, matched => {
    return r(matched);
  });
}

export function t(strings, ...interpolations) {
  let styles = css(strings, ...interpolations); // css is a helper of styled-components
  styles = styles.map(transformPxToRem);

  // Simulate raw call
  return [[""], styles];
}