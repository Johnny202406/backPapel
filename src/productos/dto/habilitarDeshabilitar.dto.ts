import { IsBoolean, IsInt } from 'class-validator';

export class HabilitarDeshabilitar {
  @IsInt()
  id: number;

  @IsBoolean()
  habilitado: boolean;
}
