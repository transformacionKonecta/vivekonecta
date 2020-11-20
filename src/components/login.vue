<template>
  <v-container grid-list-xs pa-6>
    <v-layout row justify-center>
      <v-flex xs12 md6 xl3 pa-2>
        <div class="px-4">
          <p class="text-center teal--text headline font-weight-bold">
            ¡Bienvenid@!
          </p>
          <p
            class="text-center subtitle-2 py-4"
            style="color: #042B54; font-size: 16px!important;"
          >
            A ser parte de la familia de Konecta
          </p>
          <!-- length 5 -->
          <!-- <input  type="number"  maxlength="2"   oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"/> -->
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <p class="text-center black--text title mb-2 mt-6">
              Tipo de documento
            </p>

            <v-select
              v-model="loginData.selectDocumentType"
              :items="DocumentType"
              :rules="[(v) => !!v || 'el tipo de documento es requerido']"
              label="Seleccionar"
              solo
              required
            ></v-select>
            <p class="text-center black--text title mb-2 mt-2">
              Número de documento
            </p>
            <v-text-field
              v-if="
                loginData.selectDocumentType !== 'Pasaporte' &&
                  loginData.selectDocumentType !==
                    'Permiso Temporal de Permanencia' &&
                  loginData.selectDocumentType !== 'Carnet de Extranjeria'
              "
              v-model="loginData.numeroDoc"
              type="number"
              maxlength="8"
              solo
              pattern="[0-9]*"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              @keypress="isNumber($event)"
              :rules="dniRules"
              placeholder="Ingrese el número"
              required
            ></v-text-field>
            <v-text-field
              v-if="loginData.selectDocumentType === 'Pasaporte'"
              v-model="loginData.numeroDoc"
              maxlength="11"
              solo
              type="number"
              pattern="[0-9]*"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              @keypress="isNumber($event)"
              :rules="pasaporteRules"
              placeholder="Ingrese el número de pasaporte"
              required
            ></v-text-field>

            <v-text-field
              v-if="
                loginData.selectDocumentType ===
                  'Permiso Temporal de Permanencia' ||
                  loginData.selectDocumentType === 'Carnet de Extranjeria'
              "
              v-model="loginData.numeroDoc"
              maxlength="9"
              solo
              type="number"
              pattern="[0-9]*"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              @keypress="isNumber($event)"
              :rules="ptpteRules"
              placeholder="Ingrese el número de documento"
              required
            ></v-text-field>
            <div class="d-flex flex-column pt-3 ">
              <vue-recaptcha
                sitekey="6LeLOKgZAAAAAPZD-Xs4KBJmkfpsQ3i6J8UYgpBT"
                @verify="mxVerify"
              ></vue-recaptcha>
              <br />
              <small v-if="reCaptcha == ''" class="red--text pt-0"
                >Complete el Captcha</small
              >
            </div>

            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'Acepta la política de Privacidad!']"
              required
              color="teal"
            >
              <template v-slot:label>
                <div @click.stop style="font-size: 11px;">
                  He leído y acepto la
                  <a
                    href="javascript:;"
                    color="teal"
                    class="teal--text"
                    @click.stop="terms = true"
                    >Política de Privacidad de Postulantes</a
                  >
                </div>
              </template>
            </v-checkbox>

            <v-row class="justify-center py-6">
              <v-btn
                rounded
                :disabled="!valid"
                color="teal"
                class="mr-4 white--text"
                @click="validate"
                >Enviar</v-btn
              >
            </v-row>
          </v-form>
          <v-dialog v-model="terms" width="600px">
            <v-card>
              <v-card-text
                class="pb-0 body-2"
                style="font-size: 13px!important;"
              >
                <p class="body-1 font-weight-bold text-justify pt-4">
                  POLÍTICA DE PRIVACIDAD PARA POSTULANTES
                </p>
                <p class="text-justify">
                  La presente “Política de Privacidad para Postulantes” se
                  aplica a
                  <strong>Konecta Perú</strong>, que ejerce sus actividades a
                  través de sus razones sociales: Konecta BTO S.L. Sucursal en
                  Perú (RUC N° 20546992986), Allus Spain S.L. Sucursal del Perú
                  (RUC N° 20523273851) y Stratton Perú S.A.C. (RUC N°
                  20520596233), todas con domicilio ubicado en Av. Carabaya 933,
                  Cercado de Lima, Lima, Perú; quienes son responsables de
                  recabar sus datos personales, el uso que se le dé a los mismos
                  y su protección.
                </p>
                <p class="text-justify">
                  <strong>Konecta Perú</strong>, es una empresa dedicada a
                  brindar servicios de Contact Center y a la externalización de
                  procesos de negocio (BPO), abarcando desde la planificación y
                  ejecución de tareas internas de front office y back office
                  hasta el control de actividades de agentes externos. La
                  compañía se adapta constantemente a las necesidades del
                  mercado mediante:
                </p>
                <ul>
                  <li class="text-justify">
                    La orientación al cliente y la necesidad de crecer con él
                    dando respuesta a sus necesidades en cada momento
                  </li>
                  <li class="text-justify">
                    La voluntad constante de innovar y adaptar con agilidad
                    nuevas soluciones.
                  </li>
                </ul>
                <p class="text-justify pt-2">
                  Mediante la presente Política
                  <strong>Konecta Perú</strong> hace de su conocimiento en forma
                  detallada, sencilla, expresa e inequívoca la siguiente
                  información:
                </p>
                <p class="text-justify">
                  Los datos personales que proporcione usted a
                  <strong>Konecta Perú</strong> serán incorporados a la base de
                  datos de postulantes de titularidad de
                  <strong>Konecta Perú</strong> hasta que Usted obtenga un
                  puesto de trabajo con nosotros o decida revocar su
                  consentimiento.
                </p>
                <p class="text-justify">
                  <strong>Konecta Perú</strong> tratará sus datos personales
                  para las siguientes finalidades:
                </p>
                <p class="text-justify">
                  i) participar en el proceso de selección en las plazas
                  disponibles en
                  <strong>Konecta Perú</strong>; ii) establecer un medio de
                  contacto con <strong>Konecta Perú</strong>, donde se le
                  informará sobre el estado de su candidatura, citarlo a
                  entrevistas vacantes en el futuro; iii) verificar que la
                  información que ha proporcionado es verídica a través de
                  referencias laborales y/o certificados de estudios; iv)
                  realizar los exámenes necesarios proporcionales al cargo al
                  que aspira; v) realizar el procesamiento de sus pagos
                  mensuales y otros legales en caso haya sido seleccionado; y
                  vi) realizar los trámites administrativos establecidos por
                  Ley.
                </p>
                <p class="text-justify">
                  <strong>Konecta Perú</strong> podrá tratar sus datos
                  personales directamente o podrá contratar con terceras
                  personas (nacionales e internacionales) quienes, al igual que
                  <strong>Konecta Perú</strong>, han adoptado las medidas de
                  seguridad técnicas, legales y organizativas necesarias para
                  garantizar el uso correcto de los mismos. En ese ese sentido,
                  <strong>Konecta Perú</strong> informa que hace transferencia
                  internacional de datos en los siguientes casos:
                </p>
                <table style="border-collapse: collapse;">
                  <thead>
                    <th class="caption pr-0 pl-2">DESTINATARIO</th>
                    <th class="caption pr-0 pl-2">PAÍS</th>
                    <th class="caption pr-0 pl-2">FINALIDAD</th>
                  </thead>
                  <tbody>
                    <td class="caption pr-0 pl-2">
                      Konecta BTO S.L. CIF B-62916077 (Casa Matriz)
                    </td>
                    <td class="caption pr-0 pl-2">España</td>
                    <td class="caption pr-0 pl-2">Reclutamiento</td>
                  </tbody>
                </table>
                <p class="text-justify pt-3">
                  Los datos que recibe
                  <strong>Konecta Perú</strong> se encuentran registrados ante
                  la Autoridad de Protección de Datos Personales del Ministerio
                  de Justicia. En estos casos, la compartición de sus datos
                  personales servirá únicamente para las finalidades antes
                  informadas, y se efectuarán bajo condiciones de
                  confidencialidad y medidas de seguridad que
                  <strong>Konecta Perú</strong> garantiza.
                </p>
                <p class="text-justify">
                  <strong>Konecta Perú</strong> reconoce y garantiza el
                  ejercicio de los derechos de acceso, actualización, inclusión,
                  rectificación, cancelación, oposición, información o
                  revocación de acuerdo a la Ley de Protección de Datos
                  Personales (Ley 29733) y su Reglamento. Para ello, podrá
                  dirigir su solicitud gratuita al correo electrónico:
                  <a>datospersonales@grupokonecta.com</a>, con el asunto:
                  “Derechos Datos Personales”, especificando sus datos,
                  acreditando su identidad y los motivos de su solicitud.
                </p>
              </v-card-text>
              <v-card-actions class="pb-4">
                <v-spacer></v-spacer>
                <v-btn color="teal" rounded dark @click="terms = false"
                  >Acepto</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog" class="modal">
            <v-card class="pt-6">
              <v-card-text class="title black--text text-justify"
                >Hola! Estás a un paso de iniciar tu viaje para ser parte de la
                familia Konecta.</v-card-text
              >
              <v-card-text class="body-1 text-justify"
                >A partir de este momento te pediremos tus datos personales y
                profesionales para iniciar el proceso de selección. Tus datos no
                serán compartidos con ninguna empresa y los usaremos únicamente
                para analizar tu perfil de trabajo.</v-card-text
              >
              <v-card-actions class="justify-center pb-4">
                <v-btn
                  color="orange darken-3"
                  class="white--text"
                  @click="dialog = false"
                  >Iniciar proceso</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogValidate" persistent width="350px">
            <v-card>
              <div v-if="postulante.length != 0">
              <v-card-title
                class="headline justify-center py-8  green--text text--accent-4  font-weight-bold"
                >¡Hola
                {{
                  postulante[postulante.length - 1] == undefined
                    ? ""
                    : postulante[postulante.length - 1].Nombre
                }}!</v-card-title
              >
              <v-card-text class=" body-1 px-6"
                >Tus datos ya se encuentran registrados, Si deseas postular
                nuevamente, puedes hacerlo dentro de
                {{ diffDays != 0 ? diffDays : 30 }} días.</v-card-text
              >
              <v-card-actions class="justify-center pb-10">
                <v-btn
                  width="200"
                  color="orange darken-3"
                  class="white--text "
                  @click="returnValidate()"
                  >Cerrar</v-btn
                >
              </v-card-actions>
              </div>
              <div v-else class="d-flex justify-center py-8">
                <v-card-text class="text-center pt-4">
                <v-progress-circular
                v-show="progressCir"
                :size="70"
                :width="7"
                color="teal"
                indeterminate
              ></v-progress-circular>
                </v-card-text>
              </div>
              
            </v-card>
          </v-dialog>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
//  import VueRecaptcha from 'vue-recaptcha';
// import vue-recaptcha from "../components/vue-recaptcha.vue";
import firebase from "firebase";
import moment from "moment";
export default {
  components: { VueRecaptcha },
  name: "login",
  props: {
    loginData: {
      type: Array,
      required: true,
    },
    // userState: false,
  },
  data: () => ({
    progressCir: true,
    valid: true,
    reCaptcha: "",
    // 03AGdBq27aDkIsLnHRpG2gJICllw4EM1djS6YFXSy5-uq6IF1kW8oYh7l3tFwvX1A6w6ZDuFT7U-t6YqVSAP9cfwHZW9KxeHya8VgtKJZW-mKCmfF1S0MlV9cXT0Du2L3dPKn5IGGb0HRUXn0B7sTLpZLDU-Wdq4yhEJtLvCDd3btaJtDW99x8r8NbDgKTIK53YHB7TMgz1Zi4JiS9AU0qrlcoL9NTDQEF1HujjSDOORQtNoEXG-cuZQVXH6PV2OlIDVSJu13lnpGk5tdWPPV22XOeuRt1erGMHFM2yoiVxzPJbe1S5Gu1cTyuvwWdOK6cAlSAC7rXI7kp1_bSDOP_E2R-XtwT-6aS9Qp9OuRThREFndGPSUYe1sULc4RE8cfXCsp_M8dqh0MD
    numeroDoc: "",
    terms: false,
    dniRules: [
      (v) => !!v || "El número de documento es requerido",
      (v) => (v && v.length === 8) || "El número debe ser de 8 carácteres",
    ],
    pasaporteRules: [
      (v) => !!v || "El número de documento es requerido",
      (v) => (v && v.length === 11) || "El número debe ser de 11 carácteres",
    ],
    ptpteRules: [
      (v) => !!v || "El número de documento es requerido",
      (v) => (v && v.length === 9) || "El número debe ser de 9 carácteres",
    ],
    conditions: false,

    userState: false,

    selectDocumentType: null,
    DocumentType: [
      "DNI",
      "Pasaporte",
      "Carnet de Extranjeria",
      "Permiso Temporal de Permanencia",
    ],
    checkbox: false,
    lazy: false,
    dialog: false,
    dialogValidate: false,
    postulante: [],
    diffDays: 0,
  }),
  mounted() {
    this.dialog = true;
  },
  methods: {
    mxVerify(response) {
      this.reCaptcha = response;
    },

    validate() {
      if (this.reCaptcha !== "") {
        this.dialogValidate = true;
        // console.log('es null' );
        if (this.$refs.form.validate()) {
          this.postulanteData().then((response) => {
            if (this.postulante.length > 0) {
              console.log("aqui if");
              let today = moment(moment().format("L"));
              const postulanteDate = moment(
                this.postulante[this.postulante.length - 1].registerDate
              );
              console.log(today);
              console.log(postulanteDate);
              this.diffDays = today.diff(postulanteDate, "days");
              console.log(this.diffDays);
              if (this.diffDays > 30) {
                console.log("mayor a 30 dias");
                this.snackbar = true;
                this.$emit("child-hide-event");
              } else {
                this.dialogValidate = true;
              }
            } else {
              this.snackbar = true;
              this.$emit("child-hide-event");
              console.log("entro al else");
            }
          });
        }
      }
    },

    async postulanteData() {
      const numeroDoc = this.loginData.numeroDoc;
      const snapshot = await firebase
        .database()
        .ref("POSTULANTES")
        .orderByChild("numdoc")
        .equalTo(numeroDoc)
        .once("value");
      snapshot.forEach((childSnapshot) => {
        this.postulante.push({
          Apellidos: `${childSnapshot.val().apellido_p} ${
            childSnapshot.val().apellido_m
          }`,
          Nombre: childSnapshot.val().nombres,
          registerDate: childSnapshot.val().RegistradoDate.date,
        });
      });
    },
    isNumber: function(evt) {
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


    returnValidate() {
      this.dialogValidate = false;
      this.$router.push("/");
    },
  },
  watch: {
    postulante() {
      this.progressCir = false;
    },
  },
};
</script>
<style>
th,
td {
  border: gray 1px solid;
}
</style>
