export class Components {
  static openStie = (selectedSite: HTMLSelectElement | string) => {
    window.open(`https://${selectedSite}`, "_blank");
  };
}
