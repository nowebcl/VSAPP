export const INITIAL_CLIENTS = [
  {
    id: 'cli-001',
    company: 'Panamericana Cargo S.A.',
    contactName: 'Juan Pablo Morales',
    email: 'jmorales@panamericacargo.com',
    phone: '+1 (305) 555-0142',
    location: 'Miami, Estados Unidos',
    service: 'Logística',
    notes: 'Transporte marítimo regular FCL y almacenamiento aduanero.',
    createdAt: '2026-01-15'
  },
  {
    id: 'cli-002',
    company: 'Andes Logistics SpA',
    contactName: 'Marcela Fuenzalida',
    email: 'mfuenzalida@andeslog.cl',
    phone: '+56 9 8765 4321',
    location: 'Santiago, Chile',
    service: 'Logística',
    notes: 'Despacho multimodal y distribución hacia el Cono Sur.',
    createdAt: '2026-02-03'
  },
  {
    id: 'cli-003',
    company: 'Distribuidora del Caribe Ltda.',
    contactName: 'Carlos E. Restrepo',
    email: 'operaciones@districaribe.co',
    phone: '+57 (1) 745-8820',
    location: 'Bogotá, Colombia',
    service: 'Comercio',
    notes: 'Importación de insumos industriales y suministros.',
    createdAt: '2026-02-18'
  },
  {
    id: 'cli-004',
    company: 'Pacific Trade Group Inc.',
    contactName: 'Elena Wong',
    email: 'ewong@pacifictrade.pa',
    phone: '+507 269-8011',
    location: 'Ciudad de Panamá, Panamá',
    service: 'Comercio',
    notes: 'Intermediación comercial en zona libre de Colón.',
    createdAt: '2026-03-01'
  },
  {
    id: 'cli-005',
    company: 'Asesorías Aduaneras del Plata',
    contactName: 'Roberto Vignolo',
    email: 'rvignolo@aduanasplata.com.ar',
    phone: '+54 11 4322-9900',
    location: 'Buenos Aires, Argentina',
    service: 'Asesoría',
    notes: 'Consultoría en regulaciones de comercio exterior y aranceles.',
    createdAt: '2026-03-12'
  },
  {
    id: 'cli-006',
    company: 'Meridian Global Freight Corp.',
    contactName: 'David Sterling',
    email: 'dsterling@meridianglobal.com',
    phone: '+1 (786) 430-2219',
    location: 'Fort Lauderdale, Estados Unidos',
    service: 'Logística',
    notes: 'Fletes consolidados y operaciones de forwarding internacional.',
    createdAt: '2026-03-24'
  },
  {
    id: 'cli-007',
    company: 'Inversiones & Suministros Guayas S.A.',
    contactName: 'Sofía Cárdenas',
    email: 'scardenas@guayassuministros.ec',
    phone: '+593 4 233-1188',
    location: 'Guayaquil, Ecuador',
    service: 'Comercio',
    notes: 'Compraventa transfronteriza de componentes electrónicos.',
    createdAt: '2026-04-05'
  },
  {
    id: 'cli-008',
    company: 'Consultoría Arancelaria Mexicana',
    contactName: 'Dr. Fernando Montes',
    email: 'fmontes@arancelaria.mx',
    phone: '+52 55 5280-3344',
    location: 'Ciudad de México, México',
    service: 'Asesoría',
    notes: 'Auditoría aduanal y tratados de libre comercio para exportadores.',
    createdAt: '2026-04-14'
  }
];

export const INITIAL_OPERATIONS = [
  {
    id: 'VSI-2026-104',
    clientId: 'cli-001',
    clientName: 'Panamericana Cargo S.A.',
    origin: 'PortMiami, FL (EE.UU.)',
    destination: 'Puerto de Valparaíso (Chile)',
    cargoType: 'Contenedor FCL 40ft (Maquinaria)',
    status: 'En Tránsito',
    date: '2026-09-28',
    notes: 'BL marítimo verificado. En navegación con estimación de arribo el 14 de octubre.'
  },
  {
    id: 'VSI-2026-105',
    clientId: 'cli-004',
    clientName: 'Pacific Trade Group Inc.',
    origin: 'Puerto de Balboa (Panamá)',
    destination: 'Port Everglades, FL (EE.UU.)',
    cargoType: 'Carga LCL Consolidada (Bienes de Consumo)',
    status: 'Despachado',
    date: '2026-09-30',
    notes: 'Despacho aduanero liberado y entregado al centro de acopio.'
  },
  {
    id: 'VSI-2026-106',
    clientId: 'cli-003',
    clientName: 'Distribuidora del Caribe Ltda.',
    origin: 'Houston Terminal, TX (EE.UU.)',
    destination: 'Puerto de Buenaventura (Colombia)',
    cargoType: '12 Pallets de Químicos Industriales',
    status: 'Pendiente',
    date: '2026-10-02',
    notes: 'Inspección previa y validación de certificado de origen pendiente.'
  },
  {
    id: 'VSI-2026-107',
    clientId: 'cli-007',
    clientName: 'Inversiones & Suministros Guayas S.A.',
    origin: 'Port of Long Beach, CA (EE.UU.)',
    destination: 'Terminal Marítimo Guayaquil (Ecuador)',
    cargoType: 'Repuestos Automotrices y Suministros',
    status: 'En Tránsito',
    date: '2026-09-25',
    notes: 'Tránsito interoceánico en curso. Reporte de monitoreo satelital activo.'
  },
  {
    id: 'VSI-2026-108',
    clientId: 'cli-005',
    clientName: 'Asesorías Aduaneras del Plata',
    origin: 'Miami International Airport (MIA)',
    destination: 'Ezeiza International (EZE, Argentina)',
    cargoType: 'Expediente Documental y Muestras Certificadas',
    status: 'Cerrado',
    date: '2026-09-22',
    notes: 'Cierre de ciclo operativo con liquidación de aranceles finalizada.'
  },
  {
    id: 'VSI-2026-109',
    clientId: 'cli-006',
    clientName: 'Meridian Global Freight Corp.',
    origin: 'Port of Savannah, GA (EE.UU.)',
    destination: 'Puerto de Callao (Perú)',
    cargoType: 'Carga Sobredimensionada Industrial',
    status: 'Pendiente',
    date: '2026-10-02',
    notes: 'Coordinación de permisos de estiba y transporte terrestre terrestre de enlace.'
  }
];

export const SERVICE_OPTIONS = ['Logística', 'Comercio', 'Asesoría'];

export const OPERATION_STATUSES = ['Pendiente', 'En Tránsito', 'Despachado', 'Cerrado'];

export const COMPANY_INFO = {
  legalName: 'VS International LLC',
  portalUrl: 'vsinternationalllc.com',
  officialEmail: 'info@vsinternationalllc.com',
  phone: '+1 (305) 555-8900',
  address: '1200 Brickell Avenue, Suite 1950, Miami, FL 33131, United States',
  businessScope: 'Servicios Integrales de Comercio Exterior, Logística Multimodal, Despacho Aduanero y Asesoría Comercial Internacional.',
  taxId: 'US-EIN 84-2938102',
  founded: '2019',
  workingHours: 'Lunes a Viernes: 08:30 - 18:00 EST'
};
