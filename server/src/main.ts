import './load-env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kích hoạt nén phản hồi HTTP (Gzip/Deflate) cho mọi API phản hồi từ máy chủ
  // Ngưỡng 1024 bytes: chỉ nén các response có kích thước từ 1KB trở lên để tối ưu CPU
  app.use(
    compression({
      threshold: 1024,
      level: 6,
    }),
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Cấu hình danh sách Origins được phép kết nối qua CORS
  const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL,
    'https://petmatch.io.vn',
    'http://petmatch.io.vn',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ].filter(Boolean) as string[];

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      // Cho phép nếu không có origin (server-to-server, curl, mobile app) hoặc nằm trong danh sách cho phép
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      // Cho phép mọi subdomain của petmatch.io.vn hoặc các preview deployment của vercel.app
      if (
        origin.endsWith('.petmatch.io.vn') ||
        origin === 'https://petmatch.io.vn' ||
        origin.endsWith('.vercel.app')
      ) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  });

  // Thêm ValidationPipe để tự động validate DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(`Server running on port ${port}`);
}
bootstrap();
