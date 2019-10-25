export abstract class PlanetBasicComponent {
  protected loading: boolean;
  protected message: string;

  protected constructor(...args: any) {}

  public showLoading(message: string = 'Loading...') {
    this.loading = true;
    this.message = message;
  }

  public hideLoading() {
    this.loading = false;
    this.message = '';
  }
}
