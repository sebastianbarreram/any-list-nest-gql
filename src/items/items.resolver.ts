import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ItemEntity } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';

@Resolver(() => ItemEntity)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => ItemEntity)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
  ): Promise<ItemEntity> {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [ItemEntity], { name: 'items' })
  async findAll(): Promise<ItemEntity[]> {
    return this.itemsService.findAll();
  }

  @Query(() => ItemEntity, { name: 'item' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ItemEntity> {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => ItemEntity)
  updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ): Promise<ItemEntity> {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => ItemEntity)
  removeItem(@Args('id', { type: () => ID }) id: string): Promise<ItemEntity> {
    return this.itemsService.remove(id);
  }
}
