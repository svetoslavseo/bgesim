/**
 * Simplified Saily API Service that works in both server and client environments
 * File operations only work on server side
 */

interface SailyApiResponse {
  items: any[];
  [key: string]: any;
}

interface UpdateMetadata {
  lastUpdated: string;
  nextUpdate: string;
  updateCount: number;
  status: 'success' | 'error' | 'pending';
  lastError?: string;
}

class SailyApiService {
  private static instance: SailyApiService;
  private cronJob: any | null = null;
  private isUpdating = false;

  private constructor() {}

  public static getInstance(): SailyApiService {
    if (!SailyApiService.instance) {
      SailyApiService.instance = new SailyApiService();
    }
    return SailyApiService.instance;
  }

  /**
   * Initialize the service
   */
  public async initialize(): Promise<void> {
    console.log('🔧 Initializing Saily API Service...');
    
    // Only perform server-side operations on server
    if (typeof window === 'undefined') {
      try {
        const fileStatus = await this.getFileStatus();
        const metadata = await this.getMetadata();
        
        // Check if we need an initial update
        const needsInitialUpdate = !fileStatus.exists || 
          !metadata || 
          metadata.status === 'error' ||
          (fileStatus.lastModified && 
           Date.now() - fileStatus.lastModified.getTime() > 7 * 24 * 60 * 60 * 1000); // 7 days

        if (needsInitialUpdate) {
          console.log('🔄 Running initial data update...');
          await this.updatePlansData();
        } else {
          console.log('✅ Plans data is up to date');
        }

        // Start weekly scheduling
        await this.startWeeklyUpdates();
      } catch (error) {
        console.error('❌ Server-side initialization failed:', error);
      }
    } else {
      console.log('🌐 Client-side initialization - server operations skipped');
    }
    
    console.log('✅ Saily API Service initialized successfully');
  }

  /**
   * Get current plans data from file
   */
  public async getCurrentPlansData(): Promise<SailyApiResponse | null> {
    if (typeof window !== 'undefined') {
      return null;
    }

    try {
      // Dynamic import for server-side only
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const filePath = path.join(process.cwd(), 'saily_plans.json');
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ Error reading plans data:', error);
      return null;
    }
  }

  /**
   * Get current metadata
   */
  public async getMetadata(): Promise<UpdateMetadata | null> {
    if (typeof window !== 'undefined') {
      return null;
    }

    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const metadataPath = path.join(process.cwd(), 'saily_metadata.json');
      const data = await fs.readFile(metadataPath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  /**
   * Check if plans file exists and when it was last updated
   */
  public async getFileStatus(): Promise<{
    exists: boolean;
    lastModified?: Date;
    size?: number;
  }> {
    if (typeof window !== 'undefined') {
      return { exists: false };
    }

    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const filePath = path.join(process.cwd(), 'saily_plans.json');
      const stats = await fs.stat(filePath);
      return {
        exists: true,
        lastModified: stats.mtime,
        size: stats.size
      };
    } catch {
      return { exists: false };
    }
  }

  /**
   * Update plans data using Python script
   */
  public async updatePlansData(): Promise<boolean> {
    if (typeof window !== 'undefined') {
      console.log('⚠️ Plan updates can only be run on server side');
      return false;
    }

    if (this.isUpdating) {
      console.log('⏳ Update already in progress, skipping...');
      return false;
    }

    this.isUpdating = true;
    
    try {
      console.log('🚀 Starting Saily plans data update using Python script...');
      
      const { spawn } = await import('child_process');
      
      return new Promise((resolve) => {
        const pythonProcess = spawn('python3', ['scripts/fetch-saily-data.py'], {
          stdio: 'pipe',
          cwd: process.cwd()
        });

        let output = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data: Buffer) => {
          const text = data.toString();
          output += text;
          console.log(text.trim());
        });

        pythonProcess.stderr.on('data', (data: Buffer) => {
          const text = data.toString();
          errorOutput += text;
          console.error(text.trim());
        });

        pythonProcess.on('close', async (code: number) => {
          this.isUpdating = false;
          
          if (code === 0) {
            console.log('✅ Python script completed successfully!');
            resolve(true);
          } else {
            console.error(`❌ Python script failed with exit code ${code}`);
            resolve(false);
          }
        });

        pythonProcess.on('error', async (error: Error) => {
          this.isUpdating = false;
          console.error('❌ Failed to run Python script:', error.message);
          resolve(false);
        });
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Failed to update Saily plans data:', errorMessage);
      return false;
    } finally {
      this.isUpdating = false;
    }
  }

  /**
   * Start weekly automatic updates
   */
  public async startWeeklyUpdates(): Promise<void> {
    if (typeof window !== 'undefined') {
      console.log('⚠️ Weekly updates can only be scheduled on server side');
      return;
    }

    try {
      const cron = await import('node-cron');
      
      if (this.cronJob) {
        console.log('⚠️ Weekly updates are already scheduled');
        return;
      }

      // Schedule for every Sunday at 2:00 AM
      this.cronJob = cron.schedule('0 2 * * 0', async () => {
        console.log('⏰ Weekly scheduled update triggered');
        await this.updatePlansData();
      }, {
        timezone: 'UTC'
      });

      this.cronJob.start();
      console.log('📅 Weekly updates scheduled for every Sunday at 2:00 AM UTC');
    } catch (error) {
      console.error('❌ Failed to schedule weekly updates:', error);
    }
  }

  /**
   * Stop weekly automatic updates
   */
  public stopWeeklyUpdates(): void {
    if (this.cronJob) {
      this.cronJob.stop();
      this.cronJob = null;
      console.log('⏹️ Weekly updates stopped');
    }
  }

  /**
   * Clear cache
   */
  public clearCache(): void {
    // No-op for now
  }
}

// Export singleton instance
export const sailyApiService = SailyApiService.getInstance();

// Export types
export type { SailyApiResponse, UpdateMetadata };

// Utility functions
export async function initializeSailyService(): Promise<void> {
  await sailyApiService.initialize();
}

export async function updateSailyPlansNow(): Promise<boolean> {
  return await sailyApiService.updatePlansData();
} 