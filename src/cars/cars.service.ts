
import { Injectable , HttpException , HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cars } from './entity/cars.entity';
import { CarDetailDto } from './dto/cars.dto';
import { CarDetailRequestDto } from './dto/car-details-requests.dto';
import { CarDetailResponseDto } from './dto/car-details-response.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Cars)
    private CarsRepository: Repository<Cars>,
  ) {}

  async findAll(): Promise<Cars[]> {
    return await this.CarsRepository.find();
  }



  async findCarDetails(carDetailDto: CarDetailRequestDto): Promise<CarDetailResponseDto> {
      const [make , model , year] = [carDetailDto.make , carDetailDto.model ,carDetailDto.year];

      if(make && model && year){
        const cars=  await this.CarsRepository.find({
          where : { make ,model , year}
        });
        if(!cars){
          throw new HttpException(
            'NO Data found',
            HttpStatus.BAD_REQUEST,
            );
          }

          const newCar = [...new Set(cars.map(car => car))]
          console.log('newCar :',newCar)
          const res: CarDetailResponseDto = {
            makes:[make],
            models:[model],
            years:[year],
            descriptions: newCar,
          }
          return res
      }else if(carDetailDto.make && carDetailDto.model){
        const cars=  await this.CarsRepository.find({
          where : { make ,model }
        });
        if(!cars){
          throw new HttpException(
            'NO Data found',
            HttpStatus.BAD_REQUEST,
            );
          }
          const res: CarDetailResponseDto = {
            makes:[make],
            models:[model],
            years:[...new Set(cars.map(car => car.year))],
            descriptions:[],
          }
          return res

      }else if(carDetailDto.make){
        const cars=  await this.CarsRepository.find({
          where : { make }
        });
        if(!cars){
          throw new HttpException(
            'NO Data found',
            HttpStatus.BAD_REQUEST,
            );
          }
          const res: CarDetailResponseDto = {
            makes:[make],
            models:[...new Set(cars.map(car => car.model))],
            years:[],
            descriptions:[],
          }
          return res
      }else{
        const cars=  await this.CarsRepository.find();
        if(!cars){
          throw new HttpException(
            'NO Data found',
            HttpStatus.BAD_REQUEST,
            );
          }
          const res: CarDetailResponseDto = {
            makes:[...new Set(cars.map(car => car.make))],
            models:[],
            years:[],
            descriptions:[],
          }
          return res

      }
    
    
    
    // //   } catch (error) {
    // //     console.log('Error' )
    // //     throw new HttpException(
    // //       'NO Data found',
    // //     HttpStatus.BAD_REQUEST,
    // // );
    // }
    
  }


}
