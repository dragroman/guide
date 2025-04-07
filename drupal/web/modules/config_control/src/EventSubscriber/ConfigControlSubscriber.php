<?php

namespace Drupal\config_control\EventSubscriber;

use Drupal\Core\Config\ConfigEvents;
use Drupal\Core\Config\StorageTransformEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Подписчик событий для трансформации конфигураций.
 */
class ConfigControlSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[ConfigEvents::STORAGE_TRANSFORM_IMPORT][] = ['onImportTransform'];
    $events[ConfigEvents::STORAGE_TRANSFORM_EXPORT][] = ['onExportTransform'];
    return $events;
  }

  /**
   * Реагирует на событие трансформации импорта.
   *
   * @param \Drupal\Core\Config\StorageTransformEvent $event
   *   Событие трансформации хранилища.
   */
  public function onImportTransform(StorageTransformEvent $event) {
    $storage = $event->getStorage();
    
    // Перезапись настроек locale.settings при импорте
    if ($storage->exists('locale.settings')) {
      $locale_settings = $storage->read('locale.settings');
      
      // Изменяем путь для переводов
      $locale_settings['translation']['path'] = '/var/www/html/drupal/tmp/translations';
      
      // Записываем обратно измененную конфигурацию
      $storage->write('locale.settings', $locale_settings);
      
      // Логируем изменение для отладки
      \Drupal::logger('config_control')->notice('Трансформирована конфигурация locale.settings.');
    }
  }

  /**
   * Реагирует на событие трансформации экспорта.
   *
   * @param \Drupal\Core\Config\StorageTransformEvent $event
   *   Событие трансформации хранилища.
   */
  public function onExportTransform(StorageTransformEvent $event) {
    $storage = $event->getStorage();
    
    // Исключаем модули разработки из экспорта
    $exclude_configs = [
      'devel.settings',
      'devel.toolbar.settings',
      'devel_kint_extras.settings',
      'system.menu.devel',
    ];
    
    // Исключаем также все конфигурации модулей
    $all_configs = $storage->listAll();
    foreach ($all_configs as $config_name) {
      // Исключаем основные конфигурации модулей
      if (in_array($config_name, $exclude_configs)) {
        $storage->delete($config_name);
        \Drupal::logger('config_control')->notice('Исключена конфигурация @name из экспорта.', ['@name' => $config_name]);
      }
      
      // Исключаем все настройки полей, просмотров и других типов, связанных с модулями разработки
      $modules_to_exclude = ['devel', 'devel_kint_extras'];
      foreach ($modules_to_exclude as $module) {
        if (strpos($config_name, $module . '.') === 0 || strpos($config_name, '.' . $module . '.') !== FALSE) {
          $storage->delete($config_name);
          \Drupal::logger('config_control')->notice('Исключена связанная конфигурация @name из экспорта.', ['@name' => $config_name]);
        }
      }
    }
  }

}