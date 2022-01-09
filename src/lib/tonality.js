/* Constants */

Tonality.OCTAVE = 12;
Tonality.MIDDLEC = 60;
Tonality.MIDDLEA = 69;
Tonality.A440 = 440;


/* Defines a tonality based on an array of scale degrees (counting from zero)
 * and an optional tonic defined using MIDI note numbers, which defauls to 60 (middle C)
 */

function Tonality( intervals = {}, tonic = Tonality.MIDDLEC) {
	this.intervals = intervals;
	this.tonic = tonic;
}

/* Given a scale degree, returns the pitch (in MIDI note numbers) within this tonality */
Tonality.prototype.pitch = function( degree ) {
	const l = this.intervals.length;
	return this.tonic
		+ this.intervals[ (( degree % l ) + l ) % l ]
		+ Math.floor( degree / l) * Tonality.OCTAVE;	
}

Tonality.prototype.freq = function( degree ) {
	return Tonality.A440 * Math.pow( 2, (this.pitch( degree) - Tonality.MIDDLEA) / Tonality.OCTAVE)
}

/* Given an array of scale degrees making up a chord, returns the pitches (in MIDI note numnbers) within this tonality */
Tonality.prototype.chord = function( degrees ) {
	return degrees.map( d => this.pitch(d) );
}

/* Given a scale degree, returns a new Tonality based on the degree'th degree of this Tonality */
Tonality.prototype.mode = function( degree ) {
	let newIntervals = [];
	for ( let i = 0; i < this.intervals.length; i++ ) {
		newIntervals.push( (degree + i < this.intervals.length ?
				(this.intervals[ degree + i ]) :
				(this.intervals[ degree + i - this.intervals.length] + Tonality.OCTAVE))
				-
			this.intervals[ degree ])
	}
	return new Tonality( newIntervals, this.pitch( degree ));
}

/* Sets the tonic of this Tonality (in MIDI note numbers) */

Tonality.prototype.setTonic = function( tonic ) {
	this.tonic = tonic;
	return this;
}

/* Predefined Tonalities */

Tonality.Major = new Tonality( [0, 2, 4, 5, 7, 9, 11] );
Tonality.Minor = new Tonality( [0, 2, 3, 5, 7, 8, 10] );
Tonality.NaturalMinor = Tonality.Minor;
Tonality.HarmonicMinor = new Tonality( [0, 2, 3, 5, 7, 8, 11] );
Tonality.MelodicMinor = new Tonality( [0, 2, 3, 5, 7, 9, 11] );

/* Pentatonics */

Tonality.Pentatonic = new Tonality( [0, 2, 4, 7, 9]);
Tonality.MinorPentatonic = Tonality.Pentatonic.mode( 4 );

/* Klezmer modes */

Tonality.Freygish = new Tonality( [0, 1, 4, 5, 7, 8, 10]);
Tonality.MiSheberakh = Tonality.Freygish.mode( 6 );

/* Modes */

Tonality.Ionian = Tonality.Major;
Tonality.Dorian = Tonality.Ionian.mode( 1 );
Tonality.Phrygian = Tonality.Ionian.mode( 2 );
Tonality.Lydian = Tonality.Ionian.mode( 3 );
Tonality.Mixolydian = Tonality.Ionian.mode( 4 );
Tonality.Aeolian = Tonality.Ionian.mode( 5 );
Tonality.Locrian = Tonality.Ionian.mode( 6 );

/* Balinese */

Tonality.Selisir = new Tonality( [ 0, 1, 3, 7, 8]);

export default Tonality;