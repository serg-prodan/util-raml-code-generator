<?php

namespace Paysera\Util\RamlCodeGenerator\Generator;

use Paysera\Util\RamlCodeGenerator\Entity\Definition\ApiDefinition;
use Paysera\Util\RamlCodeGenerator\Entity\SourceCode;
use Twig_Environment;

class ComposerJsonGenerator implements GeneratorInterface
{
    private $twig;
    private $vendorPrefix;

    /**
     * @param Twig_Environment $twig
     * @param string $vendorPrefix
     */
    public function __construct(
        Twig_Environment $twig,
        $vendorPrefix
    ) {
        $this->twig = $twig;
        $this->vendorPrefix = $vendorPrefix;
    }

    public function generate(ApiDefinition $definition)
    {
        $code = $this->twig->render('Client/composer.json.twig', [
            'api' => $definition,
            'vendor_prefix' => $this->vendorPrefix,
        ]);

        $item = new SourceCode();
        $item
            ->setFilepath('composer.json')
            ->setContents($code)
        ;

        return [$item];
    }
}