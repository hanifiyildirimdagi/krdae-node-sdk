import ParsedItem from "./persed-item.model";

export default class Earthquake {
  public get Identity(): string {
    return `${this.DateString}-${this.Location.Latitude}-${this.Location.Longitude}-${this.Magnitude.Local}`;
  }
  public DateString: string;
  public get Date(): Date {
    return new Date(this.DateString);
  }
  public Depth: number;
  public Location: Location;
  public Magnitude: Magnitude;
  public Additional: AdditionalData;

  constructor(parsedItem: ParsedItem) {
    const dateTime = `${parsedItem.Date.replace(/\./g, "-")} ${
      parsedItem.Time
    } GMT+0300`;
    this.DateString = dateTime;
    this.Depth = parsedItem.Depth;
    this.Location = {
      Latitude: parsedItem.Latitude,
      Longitude: parsedItem.Longitude,
      Name: parsedItem.LocationName ? parsedItem.LocationName : null,
    };
    this.Magnitude = {
      Local: parsedItem.Magnitude_ML,
      Moment: parsedItem.Magnitude_MW,
      ObjectWave: null,
      SurfaceWave: null,
      TimeDependent: parsedItem.Magnitude_MD,
    };
    this.Additional = {
      SolutionAttribute: parsedItem.SolutionAttribute,
      SolutionAttributeDate: parsedItem.SolutionAttributeDate,
    };
  }
}

/**
 * # Magnitude
 * - TimeDependent
 * - Local
 * - SurfaceWave
 * - ObjectWave
 * - Moment
 *
 * The fracture that generates an earthquake is usually deep in the earth's crust,
 * but in large earthquakes it reaches the surface of the earth and forms surface fractures,
 * which we call fault fractures. When an earthquake strikes, it is not possible to see the
 * deep-seated fracture directly, so we have to estimate its surface area indirectly. In other
 * words, although we cannot see the earthquake rupture itself, we can get an idea of its size
 * by studying the effects it produces.
 *
 * As an example, suppose someone throws a stone into a pool, but we don't know the size of the stone.
 * By listening to the sound the stone makes as it falls into the pool, or by looking at the size of
 * the ripples in the pool, we can guess whether it is a small or a large stone. Estimating the size
 * of an earthquake is a completely similar process. An earthquake creates ripples in the earth's
 * crust in a similar way to the water in a pool.
 *
 * Devices called seismometers are used to measure the fluctuations in the earth's crust. Whichever method
 * is used, it is essential that the center of the earthquake is accurately determined when calculating the
 * magnitude. Returning to the example of the stone thrown into the pool, the amplitude of the waves formed
 * on the water gradually decreases as you move away from the source point. Therefore, when interpreting the
 * amplitude of a wave, it is essential to know how far away it is coming from. An important point to keep in
 * mind is that the Earth's crust is never as simple as the water in a pool, but has a very complex texture
 * with layers, folds, etc. Therefore, earthquake-induced crustal fluctuations may undergo very different
 * changes depending on the direction of propagation. Considering these possible distortions, the results
 * of a single seismometer are often not enough to determine the magnitude. A more reliable result is obtained
 * by taking the average of many seismometer measurements that can monitor the earthquake from different
 * directions and at different distances.
 * @see http://www.koeri.boun.edu.tr/bilgi/buyukluk.htm
 */
export interface Magnitude {
  /**
   * ## Time Dependent Magnitude (Md)
   * The principle is that a larger earthquake will cause oscillations on the seismometer for a longer period of time.
   * How long the earthquake produces a vibration on the seismometer is measured and scaled by the distance from the epicenter.
   * This method is used for small (M<5.0) and close (Distance<300 km) earthquakes.
   */
  TimeDependent: number | null;
  /**
   * ## Local Magnitude (Ml)
   * This method was first proposed by Richter in 1935 to measure earthquakes.
   * Returning to the example of the stone thrown into the pool, this method can be likened to listening to the sound
   *  waves generated by the stone as it hits the water with a microphone placed in the water.
   * The highest amplitude value in the sound recording will give information about the size of the stone by scaling with the distance.
   * The same principle applies when estimating the magnitude of an earthquake.
   * This method is used for relatively small (magnitude less than 6.0) and close (less than 700 km) earthquakes. It is essential that
   * seismometers are very well calibrated to obtain accurate values.
   * @see http://www.koeri.boun.edu.tr/bilgi/buyukluk.htm
   */
  Local: number | null;
  /**
   * ## Surface Wave Magnitude (Ms)
   * This method was developed to measure large earthquakes (M>6.0) where the first two methods are inadequate.
   * Going back to the pool example, it is based on measuring the highest amplitude of the waves that form on the
   * surface of the water and spread from the center to the periphery in the form of rings.
   * Such waves can propagate very long distances from the source on the earth's surface. Unlike other methods,
   * the reliability of this method increases even more when measurements are made from a long distance.
   * @see http://www.koeri.boun.edu.tr/bilgi/buyukluk.htm
   */
  SurfaceWave: number | null;
  /**
   * ## Object Wave Magnitude (Mb)
   * This method is similar to the Surface Wave method, except that instead of waves propagating from the surface, waves traveling at depth are used.
   * Returning to the pool example, the sound waves (acoustic waves) generated by the stone hitting the water can propagate long distances in the water.
   * These sound waves can be listened to with a microphone and the highest amplitude they reach gives information about the size of the stone.
   * The situation is similar for earthquakes. However, the earth's crust produces not only sound waves but also another type of wave called shear waves.
   * These two types of waves are called body waves. Seismometers, unlike microphones, can record both types of waves (Body Waves).
   * @see http://www.koeri.boun.edu.tr/bilgi/buyukluk.htm
   */
  ObjectWave: number | null;
  /**
   * ## Moment Magnitude (Mw)
   * This magnitude type is the most reliable compared to the others.
   * In the scientific world, it is considered that if the moment magnitude can be calculated for an earthquake, there is no need for other magnitude types.
   * In terms of determination, it is the most complex of all. It essentially corresponds to the construction of a mathematical model of the earthquake's occurrence.
   * It can be calculated by a process of scientific work that can be carried out by a researcher,
   * and therefore it is inevitable that the calculations will take a certain amount of time.
   * It is difficult to implement automatically;
   *    it is routinely calculated in a few observatories around the world,
   *    but only for earthquakes above a certain magnitude.
   * In practice, the Moment Magnitude can only be calculated for earthquakes above a certain magnitude (M>4.0).
   * @see http://www.koeri.boun.edu.tr/bilgi/buyukluk.htm
   */
  Moment: number | null;
}
export interface Location {
  Latitude: number;
  Longitude: number;
  Name: string | null;
}

export interface AdditionalData {
  SolutionAttribute: string | null;
  SolutionAttributeDate: string | null;
}
