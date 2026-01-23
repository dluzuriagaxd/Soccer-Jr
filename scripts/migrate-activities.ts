/**
 * Migration script to populate activities table with existing lessons
 * Run this once to migrate from old lesson_progress to new activity system
 */

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { activityTypes, activities } from "../src/db/schema";

// Lesson data from CURSO_COMPLETO.md
const LESSONS = [
    // Módulo 1: Introducción
    { slug: "01-introduccion/01-objetivos", title: "Objetivos del Curso", order: 1, module: "01-introduccion", moduleOrder: 1, duration: 10 },
    { slug: "01-introduccion/02-materiales", title: "Lista de Materiales", order: 2, module: "01-introduccion", moduleOrder: 2, duration: 15 },
    { slug: "01-introduccion/03-reglas-competencia", title: "Reglas de Competencia Jr.", order: 3, module: "01-introduccion", moduleOrder: 3, duration: 12 },

    // Módulo 2: Diseño
    { slug: "02-diseno/01-chasis", title: "Diseño del Chasis", order: 4, module: "02-diseno", moduleOrder: 1, duration: 20 },

    // Módulo 3: Montaje
    { slug: "03-montaje/01-fase1-potencia", title: "Fase 1: Potencia", order: 5, module: "03-montaje", moduleOrder: 1, duration: 25 },
    { slug: "03-montaje/02-fase2-sensores", title: "Fase 2: Sensores", order: 6, module: "03-montaje", moduleOrder: 2, duration: 30 },
    { slug: "03-montaje/03-fase3-motores", title: "Fase 3: Motores", order: 7, module: "03-montaje", moduleOrder: 3, duration: 30 },
    { slug: "03-montaje/04-fase4-interfaz", title: "Fase 4: Interfaz", order: 8, module: "03-montaje", moduleOrder: 4, duration: 15 },

    // Módulo 4: Programación
    { slug: "04-programacion/01-teoria-control", title: "Teoría de Control", order: 9, module: "04-programacion", moduleOrder: 1, duration: 25 },
    { slug: "04-programacion/02-codigo-base", title: "Código Base PID", order: 10, module: "04-programacion", moduleOrder: 2, duration: 35 },

    // Módulo 5: Telemetría
    { slug: "05-telemetria/01-hardware-bluetooth", title: "Hardware Bluetooth", order: 11, module: "05-telemetria", moduleOrder: 1, duration: 30 },
    { slug: "05-telemetria/02-protocolo-datos", title: "Protocolo de Datos", order: 12, module: "05-telemetria", moduleOrder: 2, duration: 20 },
    { slug: "05-telemetria/03-captura-datos", title: "Captura de Datos", order: 13, module: "05-telemetria", moduleOrder: 3, duration: 30 },
    { slug: "05-telemetria/04-analisis", title: "Análisis y Optimización", order: 14, module: "05-telemetria", moduleOrder: 4, duration: 25 },
];

async function migrate() {
    // Initialize database connection
    const client = createClient({
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN,
    });

    const db = drizzle(client);

    console.log("🚀 Starting migration...\n");

    try {
        // 1. Create activity type for lessons
        console.log("📚 Creating 'lesson' activity type...");
        await db.insert(activityTypes).values({
            id: "lesson",
            name: "lesson",
            displayName: "Lección",
            icon: "📖",
            requiresCompletion: true,
            createdAt: new Date(),
        }).onConflictDoNothing();
        console.log("✅ Activity type created\n");

        // 2. Create activities for all lessons
        console.log("📝 Creating activities for all lessons...");
        for (const lesson of LESSONS) {
            const activityId = `lesson-${lesson.slug.replace(/\//g, "-")}`;

            await db.insert(activities).values({
                id: activityId,
                typeId: "lesson",
                slug: lesson.slug,
                moduleId: lesson.module,
                title: lesson.title,
                description: `Lección ${lesson.order}: ${lesson.title}`,
                orderIndex: lesson.order,
                moduleOrder: lesson.moduleOrder,
                estimatedDurationMinutes: lesson.duration,
                points: 10, // Base points for lessons
                isRequired: true,
                metadata: JSON.stringify({
                    hasVideo: true,
                    hasCode: lesson.slug.includes("montaje") || lesson.slug.includes("programacion"),
                    difficulty: "beginner",
                }),
                createdAt: new Date(),
                updatedAt: new Date(),
            }).onConflictDoNothing();

            console.log(`  ✓ ${lesson.order}. ${lesson.title}`);
        }
        console.log(`\n✅ Created ${LESSONS.length} lesson activities\n`);

        console.log("🎉 Migration completed successfully!");
        console.log("\nNext steps:");
        console.log("1. Verify activities in database");
        console.log("2. Test progress tracking on a lesson");
        console.log("3. (Optional) Migrate old lesson_progress data");

    } catch (error) {
        console.error("❌ Migration failed:", error);
        throw error;
    } finally {
        client.close();
    }
}

// Run migration
migrate().catch(console.error);
