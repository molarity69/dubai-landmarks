import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { BehaviorSubject } from 'rxjs';
import { Landmark } from '../../models/landmark.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private landmarks = new BehaviorSubject<Landmark[]>([]);
  private fetched = false;
  private currentLandmarkSource = new BehaviorSubject<Landmark | null>(null);
  currentLandmark$ = this.currentLandmarkSource.asObservable();

  constructor(private toastService: ToastService) {}

  async fetchLandmarks(): Promise<void> {
    if (this.fetched) return; // Prevent multiple fetches
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark);
    try {
      const results = await query.find();
      const landmarks = results.map(result => ({
        objectId: result.id,
        photo_thumb: result.get('photo_thumb'),
        order: result.get('order'),
        url: result.get('url'),
        short_info: result.get('short_info'),
        photo: result.get('photo'),
        location: result.get('location'),
        title: result.get('title'),
        description: result.get('description')
      })).sort((a, b) => a.order - b.order);

      this.landmarks.next(landmarks);
      this.fetched = true; // Mark as fetched
    } catch (error) {
      this.toastService.show('Error fetching landmarks', { classname: 'bg-danger text-primary' });
    }
  }

  async fetchLandmarkById(objectId: string): Promise<Landmark> {
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark);
    const landmark = await query.get(objectId);
    return this.parseObjectToLandmark(landmark);
  }

  parseObjectToLandmark(parseObject: any): Landmark {
    return {
      objectId: parseObject.id,
      title: parseObject.get('title'),
      short_info: parseObject.get('short_info'),
      description: parseObject.get('description'),
      photo_thumb: parseObject.get('photo_thumb'),
      photo: parseObject.get('photo'),
      location: parseObject.get('location'),
      order: parseObject.get('order'),
      url: parseObject.get('url')
    };
  }

  async updateCurrentLandmark(objectId: string): Promise<void> {
    const landmark = await this.fetchLandmarkById(objectId);
    this.currentLandmarkSource.next(landmark);
  }

  async saveLandmarkDetails(objectId: string, title: string, shortInfo: string, description: string): Promise<any> {
    try {
      const result = await Parse.Cloud.run("saveLandmarkDetails", { objectId, title, shortInfo, description });
      return result; // Contains the updated landmark details
    } catch (error) {
      this.toastService.show('Error saving landmark details', { classname: 'bg-danger text-primary' });
      throw error;
    }
  }

  async saveLandmarkDetailsLocal(landmarkId: string, title: string, shortInfo: string, description: string): Promise<void> {
    const LandmarkParse = Parse.Object.extend('Landmark');
    const query = new Parse.Query(LandmarkParse);
    try {
      const object = await query.get(landmarkId);
      object.set('title', title);
      object.set('short_info', shortInfo);
      object.set('description', description);
      await object.save();
      await this.fetchLandmarks();
      return Promise.resolve();
    } catch (error) {
      await this.fetchLandmarks();
      return Promise.reject(error);
    }
  }

  getLandmarksStream() {
    if (!this.fetched) {
      this.fetchLandmarks(); // Fetch landmarks if not already fetched
    }
    return this.landmarks.asObservable();
  }

  async fetchLandmarkByOrder(order: number): Promise<Landmark | undefined> {
    if (!this.fetched) {
      await this.fetchLandmarks();
    }
    return this.landmarks.value.find(landmark => landmark.order === order);
  }

  async searchLandmarks(searchText: string): Promise<Landmark[]> {
    const results = await Parse.Cloud.run('searchLandmarks', { searchText });
    return results;
  }
}
