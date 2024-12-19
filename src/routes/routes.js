import AppHeader from "../components/AppHeader.vue";
import AppHome from "../components/AppHome.vue";

import Form from "../components/MenuItems/Form.vue";

import DatosAcompanante from "../components/MenuItems/DatosAcompanante.vue";
import MotivoConsulta from "../components/MenuItems/MotivoConsulta.vue";
import RevisionSistema from "../components/MenuItems/RevisionSistema.vue";
import Antecedentes from "../components/MenuItems/Antecedentes.vue";
import AntecedentesGO from "../components/MenuItems/AntecedentesGO.vue";
import AntecedentesAndro from "../components/MenuItems/AntecedentesAndro.vue";
import SignosVitales from "../components/MenuItems/SignosVitales.vue";
import ExamenFisico from "../components/MenuItems/ExamenFisico.vue";
import Diagnostico from "../components/MenuItems/Diagnostico.vue";
import AnalisisConsulta from "../components/MenuItems/AnalisisConsulta.vue";
import Prodecimientos from "../components/MenuItems/Prodecimientos.vue";
import ExamenLab from "../components/MenuItems/ExamenLab.vue";
import Medicamentos from "../components/MenuItems/Medicamentos.vue";
import Imagenologia from "../components/MenuItems/Imagenologia.vue";
import Remisiones from "../components/MenuItems/Remisiones.vue";
import Recomendaciones from "../components/MenuItems/Recomendaciones.vue";
import IncapacidaMedica from "../components/MenuItems/IncapacidaMedica.vue";

import CierreHC from "../components/MenuItems/CierreHC.vue";

export const routes = [
  {
    path: "/AppHeader",
    component: AppHeader,
    children: [
      { path: "/", component: AppHome },
      { path: "/Form", component: Form },

      { path: "/DatosAcompanante", component: DatosAcompanante },
      { path: "/MotivoConsulta", component: MotivoConsulta },
      { path: "/RevisionSistema", component: RevisionSistema },
      { path: "/Antecedentes", component: Antecedentes },
      { path: "/AntecedentesGO", component: AntecedentesGO },
      { path: "/AntecedentesAndro", component: AntecedentesAndro },
      { path: "/SignosVitales", component: SignosVitales },
      { path: "/ExamenFisico", component: ExamenFisico },
      { path: "/Diagnostico", component: Diagnostico },
      { path: "/AnalisisConsulta", component: AnalisisConsulta },
      { path: "/Prodecimientos", component: Prodecimientos },
      { path: "/ExamenLab", component: ExamenLab },
      { path: "/Medicamentos", component: Medicamentos },
      { path: "/Imagenologia", component: Imagenologia },
      { path: "/Remisiones", component: Remisiones },
      { path: "/Recomendaciones", component: Recomendaciones },
      { path: "/IncapacidaMedica", component: IncapacidaMedica },

      { path: "/CierreHC", component: CierreHC },
    ],
  },
];
