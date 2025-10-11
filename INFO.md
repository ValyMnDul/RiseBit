npm install prisma @prisma/client	    Instalează Prisma
npx prisma init                         Creează setup-ul de bază
npx prisma migrate dev --name init	    Creează și aplică prima migrare
npx prisma generate	                    Generează clientul Prisma
npx prisma studio	                    Deschide UI pentru DB
npx tsx src/Random/test.ts	            Rulează un test
npx prisma migrate reset	            Resetează baza de date complet