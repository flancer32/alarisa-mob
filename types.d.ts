declare global {
  /** TeqFW handler published as `Alarisa_Mob_Back_Handler_HumanIngress$`. */
  type Alarisa_Mob_Back_Handler_HumanIngress = typeof import('./src/Back/Handler/HumanIngress.mjs').default;
  type Alarisa_Mob_Back_Handler_HumanIngress$ = InstanceType<Alarisa_Mob_Back_Handler_HumanIngress>;
}

export {};
