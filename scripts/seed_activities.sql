-- Activity Types
INSERT OR IGNORE INTO activity_types (id, name, display_name, icon, requires_completion, created_at)
VALUES 
('lesson', 'lesson', 'Lección', '📖', 1, unixepoch('now')),
('quiz', 'quiz', 'Quiz', '❓', 1, unixepoch('now')),
('project', 'project', 'Proyecto', '🛠️', 1, unixepoch('now')),
('assessment', 'assessment', 'Evaluación', '📝', 1, unixepoch('now'));

-- Activities (Lessons)
-- Módulo 1: Introducción
INSERT OR IGNORE INTO activities (id, type_id, slug, module_id, title, description, order_index, module_order, estimated_duration_minutes, points, is_required, metadata, created_at, updated_at) VALUES
('lesson-01-introduccion-01-objetivos', 'lesson', '01-introduccion/01-objetivos', '01-introduccion', 'Objetivos del Curso', 'Lección 1: Objetivos del Curso', 1, 1, 10, 10, 1, '{"hasVideo":true,"hasCode":false,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now')),
('lesson-01-introduccion-02-materiales', 'lesson', '01-introduccion/02-materiales', '01-introduccion', 'Lista de Materiales', 'Lección 2: Lista de Materiales', 2, 2, 15, 10, 1, '{"hasVideo":true,"hasCode":false,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now')),
('lesson-01-introduccion-03-reglas-competencia', 'lesson', '01-introduccion/03-reglas-competencia', '01-introduccion', 'Reglas de Competencia Jr.', 'Lección 3: Reglas de Competencia Jr.', 3, 3, 12, 10, 1, '{"hasVideo":true,"hasCode":false,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now'));

-- Módulo 2: Diseño
INSERT OR IGNORE INTO activities (id, type_id, slug, module_id, title, description, order_index, module_order, estimated_duration_minutes, points, is_required, metadata, created_at, updated_at) VALUES
('lesson-02-diseno-01-chasis', 'lesson', '02-diseno/01-chasis', '02-diseno', 'Diseño del Chasis', 'Lección 4: Diseño del Chasis', 4, 1, 20, 10, 1, '{"hasVideo":true,"hasCode":false,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now'));

-- Módulo 3: Montaje
INSERT OR IGNORE INTO activities (id, type_id, slug, module_id, title, description, order_index, module_order, estimated_duration_minutes, points, is_required, metadata, created_at, updated_at) VALUES
('lesson-03-montaje-01-fase1-potencia', 'lesson', '03-montaje/01-fase1-potencia', '03-montaje', 'Fase 1: Potencia', 'Lección 5: Fase 1: Potencia', 5, 1, 25, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now')),
('lesson-03-montaje-02-fase2-sensores', 'lesson', '03-montaje/02-fase2-sensores', '03-montaje', 'Fase 2: Sensores', 'Lección 6: Fase 2: Sensores', 6, 2, 30, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now')),
('lesson-03-montaje-03-fase3-motores', 'lesson', '03-montaje/03-fase3-motores', '03-montaje', 'Fase 3: Motores', 'Lección 7: Fase 3: Motores', 7, 3, 30, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now')),
('lesson-03-montaje-04-fase4-interfaz', 'lesson', '03-montaje/04-fase4-interfaz', '03-montaje', 'Fase 4: Interfaz', 'Lección 8: Fase 4: Interfaz', 8, 4, 15, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now'));

-- Módulo 4: Programación
INSERT OR IGNORE INTO activities (id, type_id, slug, module_id, title, description, order_index, module_order, estimated_duration_minutes, points, is_required, metadata, created_at, updated_at) VALUES
('lesson-04-programacion-01-teoria-control', 'lesson', '04-programacion/01-teoria-control', '04-programacion', 'Teoría de Control', 'Lección 9: Teoría de Control', 9, 1, 25, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now')),
('lesson-04-programacion-02-codigo-base', 'lesson', '04-programacion/02-codigo-base', '04-programacion', 'Código Base PID', 'Lección 10: Código Base PID', 10, 2, 35, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now'));

-- Módulo 5: Telemetría
INSERT OR IGNORE INTO activities (id, type_id, slug, module_id, title, description, order_index, module_order, estimated_duration_minutes, points, is_required, metadata, created_at, updated_at) VALUES
('lesson-05-telemetria-01-hardware-bluetooth', 'lesson', '05-telemetria/01-hardware-bluetooth', '05-telemetria', 'Hardware Bluetooth', 'Lección 11: Hardware Bluetooth', 11, 1, 30, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now')),
('lesson-05-telemetria-02-protocolo-datos', 'lesson', '05-telemetria/02-protocolo-datos', '05-telemetria', 'Protocolo de Datos', 'Lección 12: Protocolo de Datos', 12, 2, 20, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now')),
('lesson-05-telemetria-03-captura-datos', 'lesson', '05-telemetria/03-captura-datos', '05-telemetria', 'Captura de Datos', 'Lección 13: Captura de Datos', 13, 3, 30, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now')),
('lesson-05-telemetria-04-analisis', 'lesson', '05-telemetria/04-analisis', '05-telemetria', 'Análisis y Optimización', 'Lección 14: Análisis y Optimización', 14, 4, 30, 10, 1, '{"hasVideo":true,"hasCode":true,"difficulty":"beginner"}', unixepoch('now'), unixepoch('now'));
