declare global {
  /** TeqFW handler published as `Alarisa_Pwa_Back_Handler_HumanIngress$`. */
  type Alarisa_Pwa_Back_Handler_HumanIngress = typeof import('./src/Back/Handler/HumanIngress.mjs').default;
  type Alarisa_Pwa_Back_Handler_HumanIngress$ = InstanceType<Alarisa_Pwa_Back_Handler_HumanIngress>;
}

export {};
