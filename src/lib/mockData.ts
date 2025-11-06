// Mock data for MM-Yelp Dashboard

export const mockOverview = {
  kpis: {
    businesses: 15420,
    reviews: 2847563,
    photos: 1283947,
    highRatingPercent: 68.4,
    modelVersion: "v2.3.1",
    latencyP95: 245,
    costPerDay: 127.5,
  },
  trend: [
    { date: "2024-01", rating_avg: 3.8, reviews: 234567 },
    { date: "2024-02", rating_avg: 3.9, reviews: 245678 },
    { date: "2024-03", rating_avg: 4.0, reviews: 256789 },
    { date: "2024-04", rating_avg: 4.1, reviews: 267890 },
    { date: "2024-05", rating_avg: 4.0, reviews: 278901 },
    { date: "2024-06", rating_avg: 4.2, reviews: 289012 },
  ],
  recentRuns: [
    { id: "run-001", type: "ETL", status: "success", timestamp: "2024-06-15T10:30:00Z", duration: 125 },
    { id: "run-002", type: "Training", status: "running", timestamp: "2024-06-15T11:00:00Z", progress: 67 },
    { id: "run-003", type: "Batch Prediction", status: "success", timestamp: "2024-06-15T09:15:00Z", duration: 89 },
    { id: "run-004", type: "ETL", status: "error", timestamp: "2024-06-14T23:45:00Z", error: "Connection timeout" },
  ],
};

export const mockBusinesses = [
  {
    business_id: "biz-001",
    name: "The Artisan Café",
    city: "San Francisco",
    categories: ["Cafés", "Bakery"],
    rating: 4.5,
    review_count: 1245,
    photos_count: 234,
    created_at: "2020-03-15",
  },
  {
    business_id: "biz-002",
    name: "Golden Dragon Restaurant",
    city: "Las Vegas",
    categories: ["Chinese", "Asian Fusion"],
    rating: 4.2,
    review_count: 2134,
    photos_count: 567,
    created_at: "2018-07-22",
  },
  {
    business_id: "biz-003",
    name: "Tech Hub Coworking",
    city: "Austin",
    categories: ["Coworking Space", "Office"],
    rating: 4.8,
    review_count: 456,
    photos_count: 123,
    created_at: "2021-01-10",
  },
  {
    business_id: "biz-004",
    name: "Sunset Yoga Studio",
    city: "Phoenix",
    categories: ["Yoga", "Fitness"],
    rating: 4.6,
    review_count: 789,
    photos_count: 345,
    created_at: "2019-05-18",
  },
  {
    business_id: "biz-005",
    name: "Bella Italia Trattoria",
    city: "Philadelphia",
    categories: ["Italian", "Pizza"],
    rating: 4.3,
    review_count: 1567,
    photos_count: 678,
    created_at: "2017-11-03",
  },
];

export const mockModels = [
  {
    id: "model-lr-001",
    type: "Logistic Regression",
    version: "v1.2",
    status: "staging",
    created_at: "2024-05-10",
    metrics: {
      f1_macro: 0.72,
      pr_auc: 0.78,
      brier_score: 0.18,
      ece: 0.12,
    },
  },
  {
    id: "model-xgb-002",
    type: "XGBoost",
    version: "v2.3",
    status: "production",
    created_at: "2024-06-01",
    metrics: {
      f1_macro: 0.81,
      pr_auc: 0.85,
      brier_score: 0.14,
      ece: 0.09,
    },
  },
  {
    id: "model-bert-003",
    type: "BERT",
    version: "v1.5",
    status: "candidate",
    created_at: "2024-06-10",
    metrics: {
      f1_macro: 0.78,
      pr_auc: 0.82,
      brier_score: 0.16,
      ece: 0.10,
    },
  },
  {
    id: "model-resnet-004",
    type: "ResNet",
    version: "v1.1",
    status: "candidate",
    created_at: "2024-06-08",
    metrics: {
      f1_macro: 0.75,
      pr_auc: 0.80,
      brier_score: 0.17,
      ece: 0.11,
    },
  },
  {
    id: "model-multi-005",
    type: "Multimodal",
    version: "v2.3.1",
    status: "production",
    created_at: "2024-06-12",
    metrics: {
      f1_macro: 0.84,
      pr_auc: 0.88,
      brier_score: 0.12,
      ece: 0.08,
    },
  },
];

export const mockDriftData = [
  { feature: "review_count", psi: 0.08, status: "ok" },
  { feature: "rating", psi: 0.15, status: "warning" },
  { feature: "text_length", psi: 0.22, status: "alert" },
  { feature: "category_distribution", psi: 0.11, status: "ok" },
  { feature: "city_distribution", psi: 0.19, status: "warning" },
];

export const mockQualityMetrics = {
  nulls: 0.03,
  textLengthAvg: 245,
  starDistribution: {
    "1": 0.12,
    "2": 0.08,
    "3": 0.15,
    "4": 0.28,
    "5": 0.37,
  },
  classBalance: {
    high: 0.65,
    low: 0.35,
  },
};

export const mockFinOps = {
  costByJob: [
    { job: "ETL", cost: 12.5, count: 45 },
    { job: "Training", cost: 89.3, count: 8 },
    { job: "Inference", cost: 25.7, count: 156 },
  ],
  latencyMetrics: {
    p50: 125,
    p95: 245,
    p99: 378,
  },
  recommendations: [
    "Considerar particionado de datos por fecha para reducir costos de ETL",
    "Implementar caché de embeddings para reducir latencia de inferencia",
    "Programar entrenamientos en horarios de bajo costo",
  ],
};
