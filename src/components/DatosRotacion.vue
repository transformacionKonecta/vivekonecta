<template>
  <div>
    <div id="stepRot1" v-if="countRotacion === 1" class="px-1 pt-8">
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p
          class="text-center title mb-0"
          id="preg1"
        >¿Cuál de las siguientes actividades realizas con mayor frecuencia en la semana?</p>
        <v-radio-group
          v-model="datosRotacionPost.actividades"
          required
          :rules="[v => !!v || 'Selecciona una actividad']"
          class="body-1"
        >
          <v-radio
            label="Deportes de competencia"
            value="A"
            color="teal"
            class="pa-2 radioStateCivil"
          ></v-radio>
          <v-radio
            label="Negocio propio o familiar"
            value="B"
            color="teal"
            class="pa-2 mt-2 radioStateCivil"
          ></v-radio>
          <v-radio
            label="Cuido a un familiar"
            value="C"
            color="teal"
            class="pa-2 mt-2 radioStateCivil"
          ></v-radio>
          <v-radio
            label="Grupo de danza, música, arte."
            value="D"
            color="teal"
            class="pa-2 mt-2 radioStateCivil"
          ></v-radio>
          <v-radio label="Voluntariado" value="E" color="teal" class="pa-2 mt-2 radioStateCivil"></v-radio>
          <v-radio
            label="No realizo ninguna"
            value="F"
            color="teal"
            class="pa-2 mt-2 radioStateCivil"
          ></v-radio>
        </v-radio-group>
      </v-form>
    </div>
    <div
      id="stepRot2"
      v-if="countRotacion == 2 && datosRotacionPost.actividades !== 'F'"
      class="px-1 pt-12"
    >
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p class="text-center title mb-0" id="preg2">¿Dónde realizas esa actividad?</p>
        <v-text-field v-model="datosRotacionPost.text_dir_actividad" required color="teal"></v-text-field>
      </v-form>
    </div>
    <!-- <div
      id="stepRot2"
      v-if="countRotacion == 2 && datosRotacionPost.actividades !== 'F'"
      class="px-1 pt-12"
    >
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p class="text-center title mb-0" id="preg2">¿Dónde realizas esa actividad?</p>

        <div class="input-google-container">
          <gmap-autocomplete
            ref="address"
            id="starting_address"
            class="input is-pulled-left input-autocomplete"
            placeholder="Ingresa la dirección"
            v-on:place_changed="getAddressData"
            v-on:change="inputAutocomplete($event)"
          />

          <br />
          <div class="text-marker-content">
            <p class="text-center black--text title mb-3">Ahora marca</p>
            <img class="marker-image" src="../assets/marcador.png" alt="googlemarcador" />
            <p class="text-center black--text title mb-3">en el mapa la dirección</p>
          </div>

          <gmap-map
            :center="{lat:this.center.lat, lng:this.center.lng}"
            :zoom="15"
            style="width:100%;  height: 400px;"
            ref="map"
          >
            <gmap-marker
              :position="markersPersonal"
              :draggable="true"
              v-on:dragend="updateCoordinates"
            />
          </gmap-map>
        </div>
      </v-form>
    </div>-->
    <div
      id="stepRot3"
      v-if="countRotacion == 3 && datosRotacionPost.actividades !== 'F'"
      class="px-1 pt-12"
    >
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p class="text-center title mb-0" id="preg3">¿En que horario realizas esa actividad?</p>
        <v-select
          :items="horarioActividad"
          v-model="datosRotacionPost.horario_actividad"
          label="Seleccionar"
          color="teal"
          :rules="[v => !!v || 'Selecciona un horario']"
          required
        ></v-select>
      </v-form>
    </div>
    <!-- personas -->
    <div id="stepRot4" v-if="countRotacion == 4" class="px-1 pt-12">
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p class="text-center black--text title mb-4" id="preg4">¿Cuántas personas viven contigo?</p>
        <v-text-field
          v-model.number="datosRotacionPost.fam_postulante"
          class="pt-2"
          color="teal"
          placeholder="3"
          maxlength="2"
          type="number"
          pattern="[0-9]*"
          oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          @keypress="isNumber($event)"
          :rules="familyRules"
          required
        ></v-text-field>

        <!-- </v-form> -->

        <!-- Generar Datos Familiares arrFamilia -->
        <div
          v-if="datosRotacionPost.fam_postulante !== 0 && datosRotacionPost.fam_postulante <= 20"
        >
          <!-- <v-form ref="form" v-model="datosPersonalesPost.datosValidPer"> -->
          <v-flex
            v-for="(famPostulante, index) in  (datosRotacionPost.fam_postulante)"
            :key="famPostulante.id"
          >
            <v-card outlined class="mx-auto mb-4" max-width="344">
              <v-card-title
                class="color: teal lighten-2 white--text subtitle-1 py-3 justify-center"
              >Familiar - {{index + 1}}</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row class="mr-6">
                  <v-col cols="6" md="6" class="align-self-center pa-0">
                    <label for class="pt-0">Parentesco :</label>
                  </v-col>
                  <v-col cols="6" md="6" class="pa-0">
                    <v-select
                      class="mt-0 pa-0 pt-2"
                      :items="parentesco"
                      v-model="arrFamilia[index].parentesco"
                      color="teal"
                      :rules="[v => !!v || 'Selecciona el parentesco']"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="mr-6">
                  <v-col cols="6" md="6" class="align-self-center pa-0">
                    <label for>Edad :</label>
                  </v-col>
                  <v-col cols="6" md="6" class="pa-0">
                    <v-text-field
                      v-model="arrFamilia[index].edad"
                      pattern="[0-9]*"
                      maxlength="3"
                      type="number"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      @keypress="isNumber($event)"
                      color="teal"
                      class="pa-0"
                      placeholder="2"
                      :rules="[v => !!v || 'Ingresa la edad']"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mr-6">
                  <v-col cols="6" md="6" class="align-self-center pa-0">
                    <label for>Trabaja :</label>
                  </v-col>
                  <v-col cols="6" md="6" class="pa-0">
                    <v-select
                      :items="trabaja"
                      v-model="arrFamilia[index].trabaja"
                      color="teal"
                      label="Seleccionar"
                      class="pa-0"
                      :rules="[v => !!v || 'Selecciona una opción']"
                      required
                    >
                      <!-- <option v-for="option in options" :value="option.value">{{option.text}}</option> -->
                    </v-select>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-flex>
        </div>
      </v-form>
    </div>
    <div id="stepRot5" v-if="countRotacion == 5" class="px-1 pt-12">
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p class="text-center title mb-0" id="preg5">¿Qué te motiva día a día?</p>
        <v-radio-group
          v-model="datosRotacionPost.motivacion"
          :mandatory="false"
          :rules="[v => !!v || 'Selecciona una opción']"
          required
          class="pt-4 body-1"
        >
          <v-radio label="Mi familia" value="A" color="teal" class="pa-2 radioStateCivil"></v-radio>
          <v-radio label="Mis estudios" value="B" color="teal" class="pa-2 radioStateCivil"></v-radio>
          <v-radio
            label="Negocio / Proyecto personal"
            value="C"
            color="teal"
            class="pa-2 radioStateCivil"
          ></v-radio>
          <v-radio label="Viajar" value="D" color="teal" class="pa-2 radioStateCivil"></v-radio>
          <v-radio label="Otros" value="E" color="teal" class="pa-2 radioStateCivil"></v-radio>
        </v-radio-group>
      </v-form>
    </div>
    <div id="stepRot6" v-if="countRotacion == 6" class="px-1 pt-12">
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p
          class="text-center title mb-0"
          id="preg6"
        >¿Qué actividades te gusta realizar en tus tiempos libres?</p>
        <p class="text-center body-2 mb-0 gray--text">Debes de seleccionar 3 opciones</p>

        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Viajar"
          value="A"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Jugar Fútbol"
          value="B"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Jugar videojuegos"
          value="C"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Pintar/Dibujar"
          value="D"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Tomar fotografía"
          value="E"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Aprender idiomas"
          value="F"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Ir al cine"
          value="G"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Jugar voley"
          value="H"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Jugar basket"
          value="I"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Salir a comer"
          value="J"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Salir a bailar"
          value="K"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
        <v-checkbox
          v-model="datosRotacionPost[0].actividad_tiempo_libre"
          label="Otros"
          value="L"
          color="teal"
          hide-details
          class="pa-2 radioStateCivil"
        ></v-checkbox>
      </v-form>
    </div>
    <div id="stepRot7" v-if="countRotacion == 7" class="px-1 pt-12">
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p
          class="text-center title mb-0"
          id="preg7"
        >¿Cuáles son tus sedes de preferencia para trabajar con nosotros?</p>
        <v-radio-group
          v-model="datosRotacionPost[0].sede_preferencia"
          class="body-1"
          :rules="[v => !!v || 'Selecciona una opción']"
          required
        >
          <v-radio label="Sede Lima" value="A" color="teal" class="pa-2 radioExp"></v-radio>
          <v-radio label="Sede Chiclayo" value="E" color="teal" class="pa-2 radioExp"></v-radio>
        </v-radio-group>
         <v-expand-transition>
          <div id="step7.1" v-if="datosRotacionPost[0].sede_preferencia === 'A' || datosRotacionPost[0].sede_preferencia === 'E'" class="px-3 pt-2">
            <p
              class="text-center title mb-0"
              id="preg7.1"
            >¿Cuál es tu modalidad de preferencia para trabajar?</p>
            <v-radio-group
              v-model="datosRotacionPost.time_preferencia"
              class="body-1"
              :rules="[v => !!v || 'Selecciona una opción']"
              required
            >
              <v-radio label="Full Time" value="Full Time" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Part Time" value="Part Time" color="teal" class="pa-2 radioStateCivil"></v-radio>
            </v-radio-group>
          </div>
        </v-expand-transition>
      </v-form>
    </div>
    <!-- // Tabajo Remoto -->
    <div id="stepRot8" v-if="countRotacion == 8" class="px-1 pt-12">
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p
          class="text-center title mb-0"
          id="preg8"
        >¿Cuéntas con el servicio de internet en tu casa a través de un router? <br>No aplica para conexiones de paquetes de datos.</p>
        <v-radio-group
          v-model="datosTrabajoRemoto[0].servicio_internet"
          class="body-1"
          :rules="[v => !!v || 'Selecciona una opción']"
          required
        >
          <v-radio label="Si" value="Si" color="teal" class="pa-2 radioStateCivil"></v-radio>
          <v-radio label="No" value="No" color="teal" class="pa-2 radioStateCivil"></v-radio>
        </v-radio-group>
        <v-expand-transition>
          <div id="step8.1" v-if="datosTrabajoRemoto[0].servicio_internet === 'Si'" class="px-3 pt-2">
            <p
              class="text-center title mb-0"
              id="preg8.1"
            >¿Cúal es la velocidad de tu conexión a internet?</p>
            <v-radio-group
              v-model="datosTrabajoRemoto[0].megas"
              class="body-1"
              :rules="[v => !!v || 'Selecciona una opción']"
              required
            >
              <v-radio label="Más de 5 MB" value="Más de 5 MB" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Más de 10 MB" value="Más de 10 MB" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Más de 20 MB" value="Más de 20 MB" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Más de 30 MB" value="Más de 30 MB" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Ninguno" value="Ninguno" color="teal" class="pa-2 radioStateCivil"></v-radio>
            </v-radio-group>
          </div>
        </v-expand-transition>
      </v-form>
    </div>
    <div
      id="stepRot9"
      v-if="countRotacion == 9 && datosTrabajoRemoto[0].servicio_internet === 'Si'"
      class="px-1 pt-12"
    >
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p
          class="text-center title mb-0"
          id="preg9"
        >¿Con qué dispositivo te conectas a internet desde tu casa?</p>
        <v-radio-group
          v-model="datosTrabajoRemoto[0].dispositivo"
          class="body-1"
          :rules="[v => !!v || 'Selecciona una opción']"
          required
        >
          <v-radio label="Laptop" value="Laptop" color="teal" class="pa-2 radioStateCivil"></v-radio>
          <v-radio
            label="Computadora"
            value="Computadora"
            color="teal"
            class="pa-2 radioStateCivil"
          ></v-radio>
          <v-radio label="Ninguno" value="Ninguno" color="teal" class="pa-2 radioStateCivil"></v-radio>
        </v-radio-group>
        <v-expand-transition>
          <div id="step9.1" v-if="datosTrabajoRemoto[0].dispositivo === 'Laptop' || datosTrabajoRemoto[0].dispositivo === 'Computadora'" class="px-3 pt-2">
            <p
              class="text-center title mb-0 mt-5"
              id="preg8.1"
            >¿Qué tipo de procesador tiene tu computadora o laptop?</p>
            <v-radio-group
              v-model="datosTrabajoRemoto[0].procesador"
              class="body-1"
              :rules="[v => !!v || 'Selecciona una opción']"
              required
            >
              <v-radio label="AMD" value="AMD" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Intel Celeron" value="Intel Celeron" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Intel Core i3" value="Intel Core i3" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Intel Core i5" value="Intel Core i5" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Intel Core i7" value="Intel Core i7" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Ninguno" value="Ninguno" color="teal" class="pa-2 radioStateCivil"></v-radio>
           </v-radio-group>
           <p
              class="text-center title mb-0 mt-5"
              id="preg9.2"
            >¿Cuánto de memoria RAM tiene tu computadora o laptop?</p>
            <v-radio-group
              v-model="datosTrabajoRemoto[0].memoria"
              class="body-1"
              :rules="[v => !!v || 'Selecciona una opción']"
              required
            >
              <v-radio label="2 GB" value="2 GB" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="4 GB" value="4 GB" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="6 GB" value="6 GB" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="8 GB" value="8 GB" color="teal" class="pa-2 radioStateCivil"></v-radio>
              <v-radio label="Ninguno" value="Ninguno" color="teal" class="pa-2 radioStateCivil"></v-radio>
           </v-radio-group>
           <v-row class="mt-3 text--teal justify-center"> <a class = "link" style="color:teal;" target="_blank"
              href="https://www.intel.la/content/www/xl/es/support/articles/000006059/processors.html"
              >¿Cómo puedo saber qué procesador tengo?</a
            ></v-row>
          </div>
        </v-expand-transition>
      </v-form>
    </div>
    <div id="stepRot10" v-if="countRotacion == 10" class="px-1 pt-12">
      <v-form ref="form" v-model="datosPersonalesPost.datosValidPer">
        <p class="text-center title mb-0" id="preg10">¿Cuéntas con auriculares?</p>
        <v-radio-group
          v-model="datosTrabajoRemoto[0].auriculares"
          :rules="[v => !!v || 'Selecciona una opción']"
          required
        >
          <v-radio label="Si" value="Si" color="teal" class="pa-2 radioStateCivil"></v-radio>
          <v-radio label="No" value="No" color="teal" class="pa-2 radioStateCivil"></v-radio>
        </v-radio-group>
      </v-form>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from "vue2-google-maps";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  props: {
    countRotacion: 0,
    datosRotacionPost: {
      type: Array,
    },
    datosTrabajoRemoto: {
      type: Array,
    },
    datosPersonalesPost: {
      type: Array,
      required: true,
    },
    actividad_libre: Array,
  },
  components: {
    VueGoogleAutocomplete,
  },
  data() {
    return {
      //maps
      inputPrueba: {},
      address: "",
      addressTextPersonal: "",
      markersPersonal: {},
      starting_address: "",
      starting_address_obj: {},
      center: {},
      places: [],
      currentPlace: null,
      address: "",
      coordinates: {},
      // this.numeroFamy = parseInt(this.datosRotacionPost.fam_postulante);
      numeroFamy: 0,
      horarioActi: null,
      horarioActividad: ["Mañana", "Tarde", "Noche", "Horario flexible"],
      selected: [],
      sedeSelected: [],
      additional_grouped: [],
      familyRules: [
        // v => (v && v.length <= 1 || v ===0) || "Ingresa el número de personas",
        //  v => v >= 0 || 'Min 0',
        (v) => v <= 21 || "El máximo es 20",
      ],
      // actividad_libre: [],
      // datosRotacionPost.actividad_tiempo_libre: selected
      parentesco: [
        "Padre",
        "Madre",
        "Hermano(a)",
        "Hijo(a)",
        "Pareja",
        "Tio(a)",
        "Sobrino(a)",
        "Abuelo(a)",
        "Suegro(a)",
        "Otros",
      ],
      familiaPost: [{ parentesco: "", edad: 0, trabaja: false }],
      arrFamilia: [],
      trabaja: ["Si", "No"],
    };
  },
  computed: {
    hasAdditional() {
      return this.selected.length > 2;
    },
    hasSede() {
      return this.sedeSelected.length > 2;
    },
  },
  mounted() {
    this.$refs.form.resetValidation();
    /* this.geolocate(); */
    this.createObjFamilia();
    console.log(this.numeroFamy);
  },
  methods: {
    isNumber: function (evt) {
      // this.testCollection = [];
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    isfamily: function () {
      this.numeroFamy = parseInt(this.datosRotacionPost.fam_postulante);
    },
    createObjFamilia() {
      for (let i = 1; i <= 20; i++) {
        this.arrFamilia.push({
          parentesco: "",
          edad: null,
          trabaja: "",
        });
        this.datosRotacionPost.arrFamiliares = this.arrFamilia;
        // console.log("array familiares ", this.datosRotacionPost.arrFamiliares);
      }
    },
    addMarker() {
      const position = {
        lat: this.starting_address_obj.geometry.location.lat(),
        lng: this.starting_address_obj.geometry.location.lng(),
      };
      this.markersPersonal = position;
      console.log(this.markersPersonal);
      this.places.push(this.starting_address_obj);
      this.addressTextPersonal = this.starting_address_obj.formatted_address;
      console.log(this.addressTextPersonal);
      this.center = position;
      this.starting_address_obj = null;
      this.$emit("addMarker", this.addressTextPersonal);
      this.markerCoordinates();
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.markersPersonal = this.center;
        this.markerCoordinates();
      });
    },
    updateCoordinates(location) {
      this.coordinates = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };
      this.markersPersonal = this.coordinates;
      console.log(this.coordinates);
      this.markerCoordinates();
    },
    markerCoordinates() {
      this.$emit("markerCoordinates", this.markersPersonal);
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
      console.log(this.address);
      if (!this.address.geometry) {
        this.addressTextPersonal = addressData.name;
        this.$emit("addMarker", this.addressTextPersonal);
        console.log(this.addressTextPersonal);
      } else {
        this.starting_address_obj = addressData;
        console.log(this.starting_address_obj);
        this.addMarker();
      }
    },
    inputAutocomplete: function (objectInput) {
      this.inputPrueba = objectInput;
    },
  },
};
</script>
<style>
.v-application .title {
  line-height: 23px !important;
}
.input-google-container {
  width: 100%;
  margin-top: 0.5em;
}
.input-autocomplete {
  margin-bottom: 2em;
  border-bottom: 2px solid #bdbdbd;
  transition: border-bottom 0.5s ease, width 0.5s ease;
  width: 100%;
}
.input-autocomplete:focus {
  width: 100%;
  border-bottom: 2px solid #168d86;
  outline: none;
}
.text-marker-content {
  display: flex;
  margin-bottom: 1em;
}
.marker-image {
  width: 20px;
  height: 30px;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.link{
  border: 2px solid teal;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Roboto";
  font-size: 14px;
}
</style>