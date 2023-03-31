import { CitySelectComponent } from '../../components';

export function EntryView() {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        This is example Solid.js app. (<i>There was no time for CSS sorry</i>
      </p>
      <p>Below you can choose city for which the temperature will be displayed.</p>
      <CitySelectComponent />
      <p>
        All data comes from <strong>open-meteo.com</strong> API.
      </p>
    </div>
  );
}
